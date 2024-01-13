# Developers' Guide: Getting Started
First, you must initalize what is called a Fansub Repository - this contains all of your fansubs.
We recommend creating a specific folder to hold this repository to avoid clutter.
GitHub pages will work perfectly fine for this, even on the free plan. Replit only works **with deployments** as of my knowledge.
If you have a website, you can also host it their.
For examples, I'll be using "https://example.com/repo" as the repository root.
The first thing the extension will be looking for is an "index".json file. So this would be stored at "https://example.com/repo/index.json".
It contains information about the repository itself, which is useful for a future-planned Discovery System.
(The system will allow fansubs to be discovered without requiring the user to type in the URL.)
The index.json file should look like this:

```json
{
   "name": "My repository",
   "description": "Description about your fansubs, optional",
   "author": "Author, also optional"
}
```

I think all the properties are self-explanitory here, so let's move onto the next JSON file: tracks.json. Here's an example:

```json
```
