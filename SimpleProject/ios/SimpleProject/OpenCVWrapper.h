//
//  OpenCVWrapper.h
//  SimpleProject
//
//  Created by Chinthireddy, Nitesh on 4/4/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface OpenCVWrapper : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
