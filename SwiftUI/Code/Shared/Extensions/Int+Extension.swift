//
//  Int+Extension.swift
//  Counter
//
//  Created by Phuc Le Dien on 8/2/19.
//  Copyright © 2019 Dwarves Foundation. All rights reserved.
//

import Foundation

extension Int {
    func isPrime() -> Bool {
        if self <= 1 { return false }
        if self <= 3 { return true }
        for i in 2...Int(sqrtf(Float(self))) {
            if self % i == 0 { return false }
        }
        return true
    }
}
