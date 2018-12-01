# Focus Overflow
A chrome extension to stop losing time on stack overflow and get some job done.  

## What is Focus Overflow
This extension enables you to remove annoying elements on stack overflow.  
You can remove:  
* The Hot Network Questions panel  
* Job advertisements  
* The chat panel and the chat page  
* Links to stackExchange + stackexchange.com + all .stackechange pages.  
* Social Media Tags (but not for login)  

There are very good extensions that enable users to delete specific elements from any html page, like adBlock, but they are not interactive.  
Focus Overflow enables users to reactivate any of those elements at any moment, just by a click, whithout having to reload anything.  

## How dos Focus Overflow works?
The extension uses the Google Chrome API.  
It uses the browser internal storage to remember what elements where activated/deactivated.  
The popup is a control pannel that let users choose what element to activate/deactivate.  

The extension consists of javascript scripts injected into the page at two different moments:  
* When a user chooses to activate/deactivate an element on a page.  
* When there is a new active tab, or new page is loaded.  

## How to improve
Content scripts are self-executing functions. Since the scripts are executed every time the active tab changes, scripts are needlessly reinjected in the page.  
Not using self-executing functions and storing flag variables into each page would be a good way to improve the plugin. However, since the injected scripts are quite small and do not do any heavy modification to the page, it still works well whithout any noticable performance decrease for the user.  
