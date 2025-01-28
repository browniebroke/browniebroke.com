---
date: 2023-05-05
title: "Terraform and ECS task revisions"
tags:
  - terraform
  - aws
  - ecs
---

Today, I came across a problem with [Terraform](https://www.terraform.io) and ECS task revisions. The setup is that the ECS task definition and service are both defined in a Terraform, with a fixed revision tag of `latest`:

```hcl
resource "aws_ecs_task_definition" "app_task" {
  family = "app-task"

  container_definitions = jsonencode([
    {
      name  = "myapp"
      image = "XXXX.dkr.ecr.us-east-1.amazonaws.com/myapp:latest"
      ...
    }
  ])
  ...
}

resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  task_definition = aws_ecs_task_definition.app_task.arn
  ...
}
```

The application code lives elsewhere, and on the app's CI, we build the Docker image, tag it as `latest`, push to ECR and update the task definition using the AWS CLI by forcing a redeployment. The same image tag is running, but ECS adds a number at the end of the revision, so the task definition revision is something like `app-task:1`.

The problem is that Terraform doesn't know about these deployments. After a few releases, the task will look like `app-task:12`, and when running `terraform plan` without any changes in the infra code, I can see that Terraform is trying to roll back to the earlier version:

```
~ task_definition  = "arn:aws:ecs:us-east-1:XXXX:task-definition/app-task:12" -> "arn:aws:ecs:us-east-1:XXXX:task-definition/app-task:1"
```

I found a solution in [this reddit post](https://www.reddit.com/r/aws/comments/nlco6r/terraform_and_ecs_dont_change_task_revision/), where they describe the same issue, and the answer suggest a few solutions. I went with the first one, which works for now:

```hcl{6-8}
resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  task_definition = aws_ecs_task_definition.app_task.arn
  force_new_deployment = true

  lifecycle {
    ignore_changes = [task_definition]
  }
}
```

[Someone commented](https://www.reddit.com/r/aws/comments/nlco6r/comment/gzjtzm4/) a drawback of using that solution, since it prevents actual Terraform changes to the task definition, but we might be able to live with that limitation by commenting out that bit when we need to do it.
