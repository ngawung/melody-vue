---
title: Testing some function
date: 1623295592
category: Uncategorized, Programming, Vue3
lastupdate: 1623295592
nextFile: 2021/5/test
nextTitle: Your Title
prevFile: 2021/5/hello-world
prevTitle: My First Post :D
---

ok...
since this page post using markdown...
i cant simply use vue component inside markdown...
maybe i could..maybe not... im not sure how to do that actually....

but for now... i really want to use router-link inside this markdown...
maybe... maybe if i write custom rendering system for markdown...??
let say... i want this specific "a" tag that point to internal link converted into router-link...

ok.... after some quick google...
i found something interesting...

[here in this github issue](https://github.com/miaolz123/vue-markdown/issues/104)...
you can see comment by insightcoder...
im not gonna pretend i understand that... but from what i see...
he basically searching using regex and replace "a" tag with router-link...

perfect that what i need....but... reading that code make my brain hurt...
it...just.... to complicated for mee..

then scroll down a bit you got comment by soualid...
he simply select the "a" element and preventDefault() it so he can change the behaivor...

ohhh...... that smart lol... why i didnt think of that...
its simple and easy hack....

ok lets try implement this...
if you click this button i should route back to home with router-link

<button class="internal" href="Home">Go back to home</button>

i maybe gonna remove this simple hack after i manage to write custom markdown renderer....
so i can simply use component inside markdown...

for now im happy with this easy trick....
soualid.... you're ma men... 
