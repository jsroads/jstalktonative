/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "AppController.h"
#import "cocos2d.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "SDKWrapper.h"
#import "platform/ios/CCEAGLView-ios.h"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"


using namespace cocos2d;

@implementation AppController

Application* app = nullptr;
@synthesize window;

#pragma mark -
#pragma mark Application lifecycle

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[SDKWrapper getInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    // Add the view controller's view to the window and display.
    float scale = [[UIScreen mainScreen] scale];
    CGRect bounds = [[UIScreen mainScreen] bounds];
    window = [[UIWindow alloc] initWithFrame: bounds];
    
    // cocos2d application instance
    app = new AppDelegate(bounds.size.width * scale, bounds.size.height * scale);
    app->setMultitouch(true);
    
    // Use RootViewController to manage CCEAGLView
    _viewController = [[RootViewController alloc]init];
#ifdef NSFoundationVersionNumber_iOS_7_0
    _viewController.automaticallyAdjustsScrollViewInsets = NO;
    _viewController.extendedLayoutIncludesOpaqueBars = NO;
    _viewController.edgesForExtendedLayout = UIRectEdgeAll;
#else
    _viewController.wantsFullScreenLayout = YES;
#endif
    // Set RootViewController to window
    if ( [[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        [window addSubview: _viewController.view];
    }
    else
    {
        // use this method on ios6
        [window setRootViewController:_viewController];
    }
    
    [window makeKeyAndVisible];
    
    [[UIApplication sharedApplication] setStatusBarHidden:YES];
    
    //run the cocos2d-x game scene
    app->start();
    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
    [[SDKWrapper getInstance] applicationWillResignActive:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
    [[SDKWrapper getInstance] applicationDidBecomeActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
     If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
     */
    [[SDKWrapper getInstance] applicationDidEnterBackground:application];
    app->applicationDidEnterBackground();
    
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    /*
     Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     */
    [[SDKWrapper getInstance] applicationWillEnterForeground:application];
    app->applicationWillEnterForeground();
    
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    [[SDKWrapper getInstance] applicationWillTerminate:application];
    delete app;
    app = nil;
}


#pragma mark -
#pragma mark Memory management

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    /*
     Free up as much memory as possible by purging cached data objects that can be recreated (or reloaded from disk) later.
     */
}
/**
 无参数，无返回值
 */
+(void)oneHundred{
    NSLog(@"OC收到：无参数，无返回值");

}
/**
无参数，有返回值
*/
+(int)twoHundred{
    NSLog(@"OC收到：有参数，有返回值 返回值：%d",2000);
    return 2000;
}

/**
有参数，有返回值
*/
+(NSString *)threeHundred:(NSString*)adId withContent:(int)age{
    NSLog(@"OC收到：有参数，有返回值 %@ 和 %d 返回值：hello",adId,age);
    return @"hello";
}

/**
有参数，无返回值
*/
+(void)fourHundred:(NSString*)adId withContent:(int)age{
    NSLog(@"OC收到：有参数，无返回值 %@ 和 %d",adId,age);
}

/**
启动一个timer sec秒后调用 JS
*/
+(void)fiveHundred:(int)sec{
    NSLog(@"OC收到： %d 秒后 调用JS",sec);
        NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:sec
              target:[NSBlockOperation blockOperationWithBlock:^{
            /* do this! */
            NSLog(@"时间到触发");
            [self talkJS];
        }]
              selector:@selector(main)
              userInfo:nil
              repeats:NO
        ];
    
}
+(NSString *)talkJS{
    std::string strRet = "you are niu B";
       std::string jsCallStr = cocos2d::StringUtils::format("timerTestJSCallBck(\"%s\");", strRet.c_str());
       se::Value *ret = new se::Value();
       se::ScriptEngine::getInstance()->evalString(jsCallStr.c_str() , -1 , ret);
       NSLog(@"jsCallStr = %s", jsCallStr.c_str());
       return @"hehe";
}

+(void)callJsEngineCallBack:(NSString*) funcNameStr withCmd:(NSString*) cmdStr withContent:(NSString*) contentStr
{
    NSLog(@"callJsEngineCallBack...");
    std::string funcName = [funcNameStr UTF8String];
    std::string param001 = [cmdStr UTF8String];
    std::string param002 = [contentStr UTF8String];
    std::string jsCallStr = cocos2d::StringUtils::format("%s(\"%s\",\"%s\");",funcName.c_str(), param001.c_str(),param002.c_str());
    NSLog(@"jsCallStr = %s", jsCallStr.c_str());
    se::ScriptEngine::getInstance()->evalString(jsCallStr.c_str());
}
@end
