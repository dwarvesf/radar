//
//  AnimateView.swift
//  Demo
//
//  Created by Trung Phan on 2/14/20.
//  Copyright © 2020 Dwarvesf. All rights reserved.
//

import UIKit

class AnimateView: UIView {
    var isEnable = false
    
    
    @IBOutlet weak var square: UIView!
    
    override class func awakeFromNib() {
        super.awakeFromNib()
//        self.square.frame = CGRect(x: 0, y: 0, width: 100, height: 200)

    }
    @IBAction func btnTapToAnimatePress(_ sender: Any) {
        isEnable = !isEnable
        
        UIView.animate(withDuration: 1.0, delay: 0.0, usingSpringWithDamping: 0.7, initialSpringVelocity: 0.3, options: [], animations: {
            if self.isEnable {
                self.square.frame.origin.x = 0
            }else {
                self.square.frame.origin.x = self.frame.size.width - 100
            }
            
            
        }, completion: nil)
        
    }
    
}
