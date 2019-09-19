//
//  OpenCVWrapper.m
//  SimpleProject
//
//  Created by Chinthireddy, Nitesh on 4/4/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "OpenCVWrapper.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

@implementation OpenCVWrapper

RCT_EXPORT_MODULE(OpenCV);

RCT_EXPORT_METHOD(version) {
  RCTLogInfo(@"openCV Version %s", CV_VERSION);
}

RCT_EXPORT_METHOD(test:(NSString *) n resolver:(RCTResponseSenderBlock)resolve) {
  RCTLogInfo(@"in test method");
  resolve(@[@"test"]);
}

RCT_EXPORT_METHOD(fourPointTransform:(NSString *)imageBase64 onScreenSize:(CGSize) screenSize toRectangle:(NSArray *)polygonCorners resolver:(RCTResponseSenderBlock)resolve rejecter:(RCTResponseSenderBlock)reject) {
  
  @try {
    RCTLogInfo(@"screenSize width=%f hieght=%f", screenSize.width, screenSize.height);
    
    UIImage *image = [self decodeBase64ToImage:imageBase64];
    cv::Mat srcMat = [self convertUIImageToCVMat:image];
    
    RCTLogInfo(@"screen.width=%f screen.height=%f image.width=%f image.height=%f srcMat.cols=%d srcMat.rows=%d", screenSize.width, screenSize.height, image.size.width, image.size.height, srcMat.cols, srcMat.rows);
  
    CGFloat xscaleFactor = screenSize.width/srcMat.cols;
    CGFloat yscaleFactor = screenSize.height/srcMat.rows;
  
    CGPoint tl = [RCTConvert CGPoint:polygonCorners[0]];
    CGPoint tr = [RCTConvert CGPoint:polygonCorners[1]];
    CGPoint br = [RCTConvert CGPoint:polygonCorners[2]];
    CGPoint bl = [RCTConvert CGPoint:polygonCorners[3]];
    
    
  
    CGFloat w1 = sqrt( pow(br.x - bl.x , 2) + pow(br.y - bl.y, 2));
    CGFloat w2 = sqrt( pow(tr.x - tl.x , 2) + pow(tr.y - tl.y, 2));
  
    CGFloat h1 = sqrt( pow(tr.y - br.y , 2) + pow(tr.x - br.x, 2));
    CGFloat h2 = sqrt( pow(tl.y - bl.y , 2) + pow(tl.x - bl.x, 2));
    
  
    CGFloat maxWidth = (w1 < w2) ? w1/xscaleFactor : w2/xscaleFactor;
    CGFloat maxHeight = (h1 < h2) ? h1/yscaleFactor : h2/yscaleFactor;
    
    RCTLogInfo(@"height & width w1=%f w2=%f h1=%f h2=%f", w1, w2, h1, h2);
    RCTLogInfo(@"max height & width scaleFactor=%f maxWidth=%f maxHeight=%f", xscaleFactor, maxWidth, maxHeight);
  
    cv::Point2f src[4], dst[4];
    src[0].x = tl.x/xscaleFactor;
    src[0].y = tl.y/yscaleFactor;
    src[1].x = tr.x/xscaleFactor;
    src[1].y = tr.y/yscaleFactor;
    src[2].x = br.x/xscaleFactor;
    src[2].y = br.y/yscaleFactor;
    src[3].x = bl.x/xscaleFactor;
    src[3].y = bl.y/yscaleFactor;
    RCTLogInfo(@"polygonCorners [%f, %f] [%f, %f] [%f, %f] [%f, %f]", tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y);
    RCTLogInfo(@"scaled polygonCorners [%f, %f] [%f, %f] [%f, %f] [%f, %f]", src[0].x, src[0].y, src[1].x, src[1].y, src[2].x, src[2].y, src[3].x, src[3].y);
  
    dst[0].x = 0;
    dst[0].y = 0;
    dst[1].x = maxWidth - 1;
    dst[1].y = 0;
    dst[2].x = maxWidth - 1;
    dst[2].y = maxHeight - 1;
    dst[3].x = 0;
    dst[3].y = maxHeight - 1;
  
    cv::Mat undistorted = cv::Mat( cv::Size(maxWidth,maxHeight), CV_8UC1);
    cv::warpPerspective(srcMat, undistorted, cv::getPerspectiveTransform(src, dst), cv::Size(maxWidth, maxHeight));
    UIImage *warppedImage = [self convertCVMatToUIImage:undistorted];
    NSString *warppedImageBase64 = [self encodeToBase64String:warppedImage];

    RCTLogInfo(@"warpedImage width=%f height=%f", warppedImage.size.width, warppedImage.size.height);
               
    undistorted.release();
    srcMat.release();
    
    resolve(@[warppedImageBase64]);
  }@catch (NSException *exception) {
    reject(@[@"error"]);
  }
}



-(cv::Mat) convertUIImageToCVMat:(UIImage *)image {
  CGColorSpaceRef colorSpace = CGImageGetColorSpace(image.CGImage);
  CGFloat cols = image.size.width;
  CGFloat rows = image.size.height;
  
  cv::Mat cvMat(rows, cols, CV_8UC4);
  
  CGContextRef contextRef = CGBitmapContextCreate( cvMat.data, cols, rows, 8, cvMat.step[0], colorSpace, kCGImageAlphaNoneSkipLast | kCGBitmapByteOrderDefault );
  CGContextDrawImage( contextRef, CGRectMake(0, 0, rows, cols), image.CGImage );
  CGContextRelease( contextRef );
  CGColorSpaceRelease( colorSpace );
  return cvMat;
}

-(UIImage *) convertCVMatToUIImage:(cv::Mat)cvMat {
  NSData *data = [NSData dataWithBytes:cvMat.data length:cvMat.elemSize()*cvMat.total()];
  CGColorSpaceRef colorSpace;
  if ( cvMat.elemSize() == 1 ) {
    colorSpace = CGColorSpaceCreateDeviceGray();
  }
  else {
    colorSpace = CGColorSpaceCreateDeviceRGB();
  }
  CGDataProviderRef provider = CGDataProviderCreateWithCFData( (__bridge CFDataRef)data );
  CGImageRef imageRef = CGImageCreate( cvMat.cols, cvMat.rows, 8, 8 * cvMat.elemSize(), cvMat.step[0], colorSpace, kCGImageAlphaNone|kCGBitmapByteOrderDefault, provider, NULL, false, kCGRenderingIntentDefault );
  UIImage *finalImage = [UIImage imageWithCGImage:imageRef];
  CGImageRelease( imageRef );
  CGDataProviderRelease( provider );
  CGColorSpaceRelease( colorSpace );
  return finalImage;
}

- (NSString *)encodeToBase64String:(UIImage *)image {
  return [UIImagePNGRepresentation(image) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}

- (UIImage *)decodeBase64ToImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [UIImage imageWithData:data];
}

@end
