//
//  ContentView.swift
//  Counter
//
//  Created by Phuc Le Dien on 8/1/19.
//  Copyright © 2019 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct ContentView : View {
    @ObservedObject var state: AppState

    var body: some View {
        
        NavigationView {
            List {
                NavigationLink(destination: CounterView(state: state)) {
                    Text("Counter demo")
                }
                NavigationLink(destination: FavoritesPrimeContainerView(state: state)) {
                    Text("Favorites primes")
                }
            }
            .navigationBarTitle("State management")
        }
    }
}

#if DEBUG
struct ContentView_Previews : PreviewProvider {
    static var previews: some View {
        ContentView(state: AppState())
    }
}
#endif




