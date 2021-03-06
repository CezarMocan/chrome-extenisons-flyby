Welcome hiiiiiii <3

So, this is going to be a really informal session, I don't have slides or anything like that. We're just going to be
coding together and build a simple Chrome extension from scratch.

I made a [Github repository](https://github.com/CezarMocan/chrome-extenisons-flyby) which contains pretty much what we'll be building together. It'll be good for either future
reference, and also to save me if I get stuck during this exercise :)

Also, I haven't really timed this. If we run over, we can stop, but also feel free to leave whenever you have/want to.

* So, to get started, a quick show of hands—has anyone built a Chrome (or other browser) extension before? *

* If anyone feels like sharing, do you have ideas for things you'd want to build using an extension, or is this just
exploration for you? *


Cool, cool. In this session we'll really just scartch the surface of this topic. Extensions look small and innocent,
but somehow there's a super rich set of functionalities they're capable of. It's a whole universe out there.
It's kinda ridiculous. However—I'm not an expert on this, I've built a few myself, but never went into depth
with everything they're capable of. So there will likely be questions I won't have answers to. We'll figure it out as we go.

Also—please stop me at any point with questions.

So, just a tiny theoretical intro before we jump into actually building one.

A Chrome extension is just some HTML, CSS and Javascript that allows you to add some functionality to Chrome.
It's basically just a website that lives inside of Chrome, which can make use of the Chrome APIs.
These Chrome APIs give you programatic access to parts of the browser—from interacting with tabs in the browser,
to manipulating the contents of an open webpage, interction with bookmarks and history, browser appearance, and so on.
A good amount of the actions you can do in the browser as a human actor could be automated using extensions.
They're super powerful.

However, today we're going to focus on two main things: interacting with webpages from within the extension
(changing appearance, content, etc.), and creating a user interface for the extension. We're going to skip
almost completely the browser related actions, that could be the topic of another FlyBy.

All right, let's make an extension. Follow along on your computer if you want, and stop me for questions when
things are not clear. We might not have time for individual troubleshooting during the walkthrough,
but I'll try to go slowly, and we can do bugfixes one on one at the end.

The first thing we're going to do is create a new folder for our extension.

0. Make a new folder.

1. Create manifest.json file, with 4 fields.

2. Navigate to chrome://extensions and load the extension. We now have an empty extension.
Let's make it do something!!

Before that, quick theoretical interlude. There are 3 types of scripts that a Chrome extension can run.
Show scheme. Talk about background, content, popup scripts.

They are all contained, meaning that you can't call JS functions between them.
In more official terms, it means that each one of them is running inside its own JS context.
You can communicate between them using the message passing API that Chrome makes available to scripts
inside of the extension.
If my understanding is correct, that's largely a security measure—separating the context of the web
page you're seeing, from other things Chrome can do.

Today we're going to deal with the CONTENT and POPUP side of things, and will ignore the BACKGROUND.

Let's start with the content script—this is the script that can interact directly with our webpage.
We're going to do a simple exercise of changing the style of all elements on the page.

The inspiration for this exercise is a net artist, Rafael Rozendaal. Some of you might be familiar with him.
He makes abstract websites, and has worked with browser extensions. He has this series that I love so much,
where he created weavings out of the structure of various websites on the internet. We're going to build an
extension that turns websites into abstract compositions like these ones.

3. Update manifest.json to include a content script, and give it permissions for activeTab.
Load the extension in the browser and see what happens.

4. Create a content.js file and do a console.log inside of it. Navigate to nytimes.com and watch the console.log do its thing.

5. Let's make the background color of the page red. Easy.

6. Next, let's make things a little more interesting—let's give the background a random color each time the page loads.

7. Amazing. Now, let's move on to giving each element on the page a random color.
We're going to use the element.children functionality of HTML and use the fact that HTML can
be manipulated as a tree structure.

Test it.

8. Once it works, let's make the text disappear.
Let's test again.

Why do we still see some text appearing in non-transparent color?

9. Let's fix that. Let's make it such that every time we press the key "e" on the keyboard, we re-generate the random color pattern.
In that way, we can update things as the website is fully loaded.
Let's test again.

10. Let's make the images disappear as well.
Siiiiick. We're almost done with the first part.

11. The last step, let's try this on a few other websites. For that, we need to update the "matches" in our manifest.json.

The bottom line here is that you can manipulate the page in any way you want. You can add custom javascript,
add HTML elements, remove HTML elements.
Anything you can do on your own website, you can do in a content script inside of the chrome extension to an existing website.

One thing I didn't show, but that's easy to do, is bringing in external dependencies. For example, the p5 library, or jquery, or tone.js.
Or really anything you want. You need to download those scripts, place them in the folder of the extension, and tell manifest.json that there
are other JS files as well. Extensions are very particular about security, so they want to be aware of every single JS script that's being
executed. The example on Github has jquery added as a dependency. * show where in manifest.json we'd add it *

I want to show one more thing, which is building a very simple UI for our extension. Let's make it such that instead of having to press
"e" on the keyboard, we press a button in the extension's user interface. By extension user interface, I mean this little dialog—show AdBlock.

12. First, we need to tell the manifest.json file that we're introducing a pop-up UI.

13. Next, let's create the popup.html file and put a button in it. Let's also style the button. Let's make sure it works.

14. Awesome. Next up, we need to capture the click event on our button. Let's do an alert to make sure it works.

15. Now, we need to send the message to the content script, telling it to do the page manipulation we've implemented earlier. Let's add the listener
and print the message we got to the console.

16. Amazing, now all we need to do is to call the changeAllColors(document.body) function once the message is received.

17. That's all. Let's try it out on a few different websites;
  * itp help
  * youtube
  * nytimes
  * any requests?

18. That's about it. Again, you can bring external JS dependencies inside of this popup window—you can make a p5 sketch if you want,
use websockets, or really anything that's crossing your mind. It's a normal webpage.

Again, this is only scratching the surface of what's possible, but it should give you the basic building blocks
to build pretty complex things already. Check out the Github page for this code and use it as boilerplate for future projects if you want.

I should mention that for inspiration I used Rafael Rozendaal's art, the Hacking the Browser class github repo—they have a good amount of chrome
extensions in there, check it out. And some materials from the Performing the Internet class I took last semester.

That's all, TY <3
