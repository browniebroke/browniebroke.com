---
date: 2021-10-15
author: browniebroke
title: 'Compare the column datatypes of 2 tables in Redshift'
description: 'A quick post of somethign I learnt today.'
header_image: header.png
tags:
  - sql
  - redshift
  - data
---

Today we had a bug in our data pipeline where a view couldn't be refreshed due to conflicting data types. The view was pulling data from 2 tables and doing a `UNION ALL` and Redshift was raising an error:

```
Update of materialized view custom_view failed
DETAIL:  UNION types character varying and integer cannot be matched
```

I wasn't sure how get started as the query was quite big and the error message wasn't mentioning a particular column. I cannot share the original code as it's not open source, but I'll try to give a simplified example:

```sql
CREATE MATERIALIZED VIEW custom_view
AS (
  table_a AS (
    SELECT
      t1.main_id AS "main_id",
      NULL       AS "secondary_id"
    FROM t1
  ),
  table_b AS (
    SELECT
      t2.main_id      AS "main_id",
      t2.secondary_id AS "secondary_id"
    FROM t2
  ),
  table_a_and_b AS (
    SELECT * FROM table_a
    UNION ALL
    SELECT * FROM table_b
  )
  SELECT * FROM table_a_and_b
```

It was pretty clear that the error was happening in the `UNION` when creating `table_a_and_b`, but in my actual example there was ~35 columns in the resulting table. The error was happening when refreshing the materalized view:

```sql
REFRESH MATERIALIZED VIEW custom_view
```

Following a suggestion from a collegue, I started commenting some lines to try to isolate the problem, but then I realised that if I could put each side of the `UNION` in their own view, maybe I would be able to compare the inferred data types. So I created `custom_view_a` and `custom_view_b` to do exactly that.

Then, I ustilised the `information_schema` table:

```sql
WITH
table_a_part AS (
    SELECT
        column_name,
        data_type
    FROM information_schema.columns
    WHERE table_name = 'custom_view_a'
),
table_b_part AS (
    SELECT
        column_name,
        data_type
    FROM
        information_schema.columns
    WHERE
        table_name = 'custom_view_a'
)
SELECT
    table_a_part.column_name,
    table_a_part.data_type AS table_a_data_type,
    table_b_part.data_type AS table_b_data_type
FROM table_a_part
JOIN table_b_part ON table_a_part.column_name = table_b_part.column_name
WHERE
    table_a_part.column_name = table_b_part.column_name
    AND
    table_a_part.data_type != table_b_part.data_type
```

This gave me a nice list of the columns that had a different type in each table:

| column_name  | table_a_data_type | table_b_data_type |
|--------------|-------------------|-------------------|
| secondary_id | character varying | integer           |

Bingo! The `NULL AS "secondary_id"` defaults to a varchar instead of being an integer. The fix was then to cast the null as an integer:

```diff
  CREATE MATERIALIZED VIEW custom_view
  AS (
    table_a AS (
      SELECT
        t1.main_id        AS "main_id",
-       NULL              AS "secondary_id"
-       CAST(NULL AS INT) AS "secondary_id"
      FROM t1
    ),
  ```

After updating the view with the new casting, the refresh started working again. I'm proficient enough in SQL to write some complex queries, but with a bit of searching, I was able to ask a better answer to the DB server itself.