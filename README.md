# NetflixFanCaps
A browser extension that allows you to add fansubs to Netflix!

## What?
The term "fansubs" is short for "fan subtitles" or "fan-made subtitles", which is exactly what it sounds like: unofficial fan-made subtitles that translate content from one language to another.
This is usually because content that was originally in a different language (eg anime) has dubs, but they usually aren't exact translations.
And specifically with anime, the dubs, especially ones made for the US, are censored due to a difference in content standards. 
However, this isn't just with dubs of content in different languages - it also happens with some Netflix originals when you switch the audio language.
When you select the English captions, Netflix is just showing you captions for either the English dub, or English original audio.
This extension allows you to add fansubs from different sources across the internet.

## Where?
On Netflix, using Firefox browser, or Chromium-based browsers that **still support manifest v2**.
As of right now, there's no version for manifest v3, but due to how the code structure is going to be lain out, there may be a v3 version in the future.
It is **not** available on mobile devices or smart TVs, though it *might* work on Android mobile devices if you open Netflix in Firefox. (I don't have an Android device to test this on, however.)
Eventually, if I get Netflix' permission, I might be able to create modified Netflix clients for mobile devices and smart TVs that support this, or maybe Netflix will officially add this to their official clients.
However, that's more of a long term goal.

## Why?
Fansubs have existed for a while, but not in the most ethical ways. Usually, fan-subs are text overlaid onto the original content, and exported as a video with the captions, and then distributed - which is actually piracy.
While *some* companies are okay with this, not *all* companies are, and this can lead to lawsuits, and fansubs being taken down, leaving some viewers with no way to actually understand what's happening.
Also, English subtitles are only created for the English dub of Netflix originals, and not any other language - leaving English captions on Netflix being inaccurate.
This extension aims to fix both of those issues - accurately translating content in a foriegn language, and allowing people to make fansubs *without* having to resort to piracy.

## Who?
This extension is for everyone! Whether you want to be able to see an accurate translation of a show's original language, or maybe you're learning a language and need to see what the show is actually saying.
Maybe you want to see how different people translate different things, or have correct subtitles. (I've seen some shows where the English subtitles don't match the English audio, and it was originally in English).
This extension wasn't designed with a specific group of people in mind. It was made for anyone who wants to use it.
Currently, it will only be available in English, but I plan to eventually try and localize the settings in as many languages as Netflix itself supports.

## How?
Open a show, go to the "Audio and Languages" section, and just select a fansub option.
The browser extension remembers whether or not you had fansubs enabled, and which fansubs you had chosen.
It remembers this by a unique "type id", which the fansub create sets, as well as which Fansub Repository it's being pulled from.
For example, if it was from a respository at "https://www.example.com/repository" and was id "spanish-to-french", it'd look for those subtitles before defaulting to "Fansubs Off".
I made this by using the Inspect Element tool to view which HTML elements Netflix uses to show the subtitles and also the subtitles controls. 
I am not using any of Netflix's code in the extension itself, because I do not intend to infringe Netflix' copyright with this extension. (Quite the contrary!)
