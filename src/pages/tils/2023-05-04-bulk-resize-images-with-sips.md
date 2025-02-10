---
date: 2023-05-04
title: "Bulk resize images with sips"
---

Today, I needed to bulk resize a bunch of images that I had in a folder. I decided to ask ChatGPT to solve my problem for me and it did it beautifully. Here is the prompt I used:

> What's he quickest way to resize some JPEG images in a given folder on macOS? The original dimensions are 3984×3984 and want to get them around 1000×1000, with an average quality, while staying in JPEG format.

It suggested to use `sips` (Scriptable Image Processing System) and not only gave me the solution, but also the explanation of the command, and explained how to open the terminal app on macOS, which is great for people who are not familiar. Here is the command it suggested:

```bash
for img in *.jpg
  do sips -Z 1000 --setProperty format jpeg --setProperty formatOptions 65 "$img" --out "Resized/$img"
done
```

And here are the explanations:

> This command does the following:
>
> 1. Loops through all JPEG files in the folder with the `*.jpg` file extension.
> 2. Resizes the images to fit within a 1000x1000 pixel bounding box, maintaining their aspect ratio (`-Z 1000`).
> 3. Sets the output format to JPEG and the quality to approximately 65% (average quality) using the `--setProperty` flags.
> 4. Saves the resized images in a new folder named "Resized" within the current folder (`--out "Resized/$img"`).
> 5. After the command has completed, you should see a new folder named "Resized" in your original folder, containing all the resized JPEG images.

I initially got an error, because the `Resized` folder didn't exist, so I just created it. After that, it worked like a charm.
