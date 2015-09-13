    /* feedreader.js
     *
     * This is the spec file that Jasmine will read and contains
     * all of the tests that will be run against your application.
     */

    /* check valid url
     * credit: http://stackoverflow.com/questions/18364404/javascript-url-validation-regex
     */

    function isValidUrl(url) {
        try {
            return !!url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
        } catch (error) {
            return false;
        }
    }

    /* Check if is a String is not blank
     * credit: http://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript
     */

    function isBlank(string) {
        return (!string || /^\s*$/.test(string));
    }

    $(function() {
        describe('RSS Feeds', function() {

            /* Tests to make sure that the allFeeds variable has been
             * defined and that it is not empty. 
             */

            it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
                expect(allFeeds instanceof Array).toBeTruthy();
            });

            /* Test that loops through each feed in the allFeeds
             * object and ensures it has a URL defined
             * and that the URL is not empty.
             */

            it('have valid link URLs defined', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.url).toBeDefined();
                    expect(isValidUrl(feed.url)).toBe(true);
                });
            });

            /* Test that loops through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */

            it('have valid names defined', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.name).toBeDefined();
                    expect(isBlank(feed.name)).not.toBe(true);
                });
            });
        });

        /* Test suite for the menu */

        describe('The menu', function() {

            /* Test that ensures the menu element is
             * hidden by default. 
             */

            var body = $('body');
            var menuIcon = $('.menu-icon-link');
            it('is hidden by default', function() {
                expect(body.hasClass('menu-hidden')).toBe(true);
            });

            /* Test that ensures the menu changes
             * visibility when the menu icon is clicked. 
             */

            it('changes visibility when the menu icon is clicked', function() {
                menuIcon.trigger('click');
                expect(body.hasClass('menu-hidden')).toBe(false);
                menuIcon.trigger('click');
                expect(body.hasClass('menu-hidden')).toBe(true);
            });
        });

        /* Test suite for Initial Entries */
        describe('Initial Entries', function() {

            /* Test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             */

            beforeEach(function(done) {
                loadFeed(0, done);
            });
            it('has at least one entry', function(done) {
                var entries = $('.feed').find('.entry');
                expect(entries.length).toBeGreaterThan(0);
                done();
            });
        });

        /* Test suite named New Feed Selection */
        
        describe('New Feed Selection', function() {
            var before, after;

            /* Calls the `loadFeed` function with callbacks to ensure that
             * they're complete.
             */

            beforeEach(function(done) {
                expect(allFeeds.length >= 2).toBe(true);
                loadFeed(0, function() {
                    before = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                    loadFeed(1, function() {
                        after = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                        done();
                    });
                });
            });

            /* Tests that when a new feed is loaded by the loadFeed function
             * that the content actually changes.
             */

            it('changes content', function(done) {
                expect(before).not.toEqual(after);
                done();
            });
        });

    }());