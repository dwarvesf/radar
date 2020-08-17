//
//  HostingController.swift
//  Counter Watch Extension
//
//  Created by phucld on 2/26/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import WatchKit
import Foundation
import SwiftUI

class HostingController: WKHostingController<ContentView> {
    override var body: ContentView {
        var appState = AppState()
        
        if let appStateData = UserDefaults.standard.value(forKey: "AppState") as? Data,
            let decodedAppState = try? JSONDecoder().decode(AppState.self, from: appStateData) {
            appState = decodedAppState
        }
        return ContentView(state: appState)
    }
}
