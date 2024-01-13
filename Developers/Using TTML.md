# Developers' Guide: Using TTML
For TTML, we're basing it off of how Netflix stores their captions for maximum compatibility.
We're going to show you an example of captions:

```xml
<tt ttp:contentProfiles="http://www.w3.org/ns/ttml/profile/imsc1.1/text" ttp:tickRate="10000000" ttp:timeBase="media" xml:lang="en">
  <head>
    <!-- change type to "CC" if including things like "[sad music plays]" or "[clattering]", "SUBS" if it's just a translation. -->
    <!-- "CC" can also be used for translations that include sound effects -->
    <metadata nttm:movieID="XXXXXXXX" nttm:textType="SUBS" />
    <styling>
      <inital
        tts:backgroundColor="transparent" tts:color="white" tts:displayAlign="after"
        tts:extent="80.000% 80.000%" tts:fontSize="6.000rh" tts:opacity="1.000" tts:origin="10.000% 10.000%"
        tts:showBackground="whenActive" tts:textAlign="center" tts:textOutline="black 0.300rh" tts:WritingMode="ltrb"
        tts:fontFamily="Japanese" <!-- only if subs are in Japanese -->
      />
      <style xml:id="style0"
        tts:fontWeight="normal"
        tts:direction="rtl" <!-- RTL languages only - Arabic, Hebrew, etc. -->
      />
      <!-- style 1 only required for Japanese -->
      <style xml:id="style1"
        tts:fontSize="6.000rh"
      />
    </styling>
    <layout>
      <region xml:id="region0" tts:displayAlign="after" tts:extent="80.000% 80.000%" tts:origin="10.000% 10.000%" />
    </layout>
  </head>
  <body>
    <div>
      <p xml:id="subtitle1" begin="200000000t" end="900000000t" region="region0" style="style0">
        Most languages
      </p>
      <p xml:id="subtitle2" begin="900000000t" end="999900000t" region="region0" style="style0">
        <span style="style1">
          Japanese text (not Romaji)
          <br/>
          More Japanese text
        </span>
      </p>
    </div>
  </body>
</tt>
```

This is how captions should be formated. You can learn more about TTML in general over on [MDN's page on IMSC captioning](https://developer.mozilla.org/en-US/docs/Related/IMSC).
