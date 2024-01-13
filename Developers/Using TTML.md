# Developers' Guide: Using NFS Subtitles Format
We use a custom JSON format for our files. We're going to show you an example of captions:
Store the subtitles in a JSON file:
```json
[
  {
    "lines": [ "line 1 (required)", "line 2 (optional)" ],
    "start": 0,
    "end": 42500,
    "lang": "en"
  }
]
```

Time is represented in milliseconds.
