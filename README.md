# vodafonTest

# Vodafone Test

[![Vodafone.nl](https://www.shebanian.com/blogitems/392-liberty-global-en-vodafone-samen-vodafoneziggo.gif)](https://www.vodafone.nl/)

[![Build Status](https://travis-ci.com/github/jane-gerashchenko/vodafonTest.svg?branch=master)](https://travis-ci.com/github/jane-gerashchenko/vodafonTest)

## Installation
To install packages use ``npm install`` command. To run the script use ``npm run cypress:open`` command.

# User story for Vodafone.nl:
> As a user I would like to have smooth checkout flow while ordering a smart phone (iPhone 11 yellow color) via vodafone.nl

## Assignment
  - Implement the logic for the user story above and create automated acceptance tests that ensures the implementation works correctly. Use [cypress test automation tool](https://www.cypress.io/).
  - Share the challenges you faced while designing the automation and the steps you tried to mitigate them.

## Implemented
 - Selecting iPhone 11 in yellow color
 - Checkout flow
 
### Chalanges
 - *Synchronous requests on before unload event:*
> This throws uncaught exception in Chrome 80+, which fails the test.
To mitigate this, I added uncaught exception handler to recognize them and continue test without failing.
> As a part of the team, though, I would recommend fixing this behavior as stated [here](https://www.chromestatus.com/feature/4664843055398912)

 - *Behavior of the check out flow is not deterministic:*
> There are a couple of popups, mainly concerning whether the user already has Ziggo at home or not which are not always there, and also page with product customization has 2 behaviors. Which is problematic especially for Cypress, as it strives to have a deterministic flow as a part of their goal of not having flaky tests. To mitigate this, I have added a ``force: true`` flag for some clicks to move the test further and to make it more reliable.
> As a part of the team, I would have two variants of the page and test: one with the popup (as determined by a query string parameter, cookie, etc.) and another without the popup. The same should be done for product customization page.

 - *Inconsistent selectors:*
> Some elements have data-testid attribute, some have id attribute and others have name attribute. These can all be present on an element, or just one, which makes writing and maintaining tests somewhat problematic. I would adopt PageObject pattern to move all the selectors for each page to separate file, so that maintenance is easier in case selectors are changing and this also makes tests more readable.

- *Connection issues:*
> Often I received this error at the network level: > ``Error: connect ECONNREFUSED 139.47.222.222:443``
> I would run those tests on a Staging environment, as Production might have a protection agains suspicios activity such repetitive actions in the tests.
