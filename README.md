# feed-reader-testing

About the project: 

Tests were added in jasmine/spec/feedreader.js to test for functionality of the website. 

The following tests are included:

- RSS feeds are defined in allFeeds and are not empty.
- Each feed in allFeeds has a defined and valid (simple RegExp) URL.
- Each feed has a defined and non-blank name.
- Navigation menu is hidden by default (on page load).
- Navigation menu toggles visibility after clicking the menu icon.
- First feed has at least one entry.
- Feed changes content after selecting a new feed.

How to run : 

Download and open the project in the browser locally. Open index.html and all needed Jasmine libraries are included, and you will see a section below the page showing the test results.

or try it at : http://shanmathi1.github.io/feed-reader-testing/
