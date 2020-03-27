//
//  AppState.swift
//  Counter
//
//  Created by Phuc Le Dien on 8/2/19.
//  Copyright © 2019 Dwarves Foundation. All rights reserved.
//

import SwiftUI
import Combine

class AppState: ObservableObject, Codable {
    var objectWillChange = ObservableObjectPublisher()
    
    var count = 0 {
        willSet {
            objectWillChange.send()
            saveToUserDefault()
        }
    }
    
    var favoritePrimes: [Int] = [] {
        willSet {
            objectWillChange.send()
            saveToUserDefault()
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case count = "count"
        case favoritePrimes = "favoritePrimes"
    }
    
    private func saveToUserDefault() {
        let appStateJson = try? JSONEncoder().encode(self)
        UserDefaults.standard.set(appStateJson, forKey: "AppState")
    }
}
