//
//  PrimeAlert.swift
//  Counter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import Foundation

struct PrimeAlert: Identifiable {
  let prime: Int
  var id: Int { self.prime }
}
