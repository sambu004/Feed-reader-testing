/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a url defined and not to be empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a name defined and not to be empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    describe("The Menu", function(){

        var body = $('body');

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should have menu hidden by default', function(){
            expect(body.hasClass("menu-hidden")).toBe(true);
         });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('should open menu when clicked', function(){
            var menu = $('.menu-icon-link');
            menu.click();
            expect(body.hasClass("menu-hidden")).toBe(false);

            menu.click();
            expect(body.hasClass("menu-hidden")).toBe(true);
          });
    });

    describe("Initial Entries", function(){

        //To have Accuracy for testing Asynchronous functions
        beforeEach(function(done){
            loadFeed(0, done);
        });
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should have atleast single entry when the loadFeed function is called', function(done){
            var entries = $(".feed .entry-link").children(".entry");
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
     });

    describe('New Feed Selection', function(){


        var feed;

        beforeEach(function(done){
            loadFeed(0,function(){
                feed = $(".feed").html();
                loadFeed(1, done);
            });
        });
    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

        it('should change the content when new feed is loaded', function(done){
            var newFeed = $(".feed").html();
            expect(feed).not.toBe(newFeed);
            done();
        });
    });
}());
