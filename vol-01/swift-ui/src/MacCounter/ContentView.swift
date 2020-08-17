//
//  ContentView.swift
//  MacCounter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

enum Feature: String, Hashable {
    case countPrime
    case favoritesPrime
}

struct ContentView : View {
    
    @ObservedObject var state: AppState
    @State private var selectedFeature: Feature?

    var body: some View {
        
        NavigationView {
            NavigationMaster(selectedFeature: $selectedFeature)
                
            if selectedFeature == .countPrime {
                NavigationDetail(view: CounterView(state: state))
            }
            
            if selectedFeature == .favoritesPrime {
                FavoritePrimesView(state: state)
            }
        }
        .frame(minWidth: 700, minHeight: 300)
    }
}

#if DEBUG
struct ContentView_Previews : PreviewProvider {
    static var previews: some View {
        ContentView(state: AppState())
    }
}
#endif
