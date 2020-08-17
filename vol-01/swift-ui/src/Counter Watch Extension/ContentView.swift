//
//  ContentView.swift
//  Counter Watch Extension
//
//  Created by phucld on 2/26/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct ContentView : View {
    @ObservedObject var state: AppState

    var body: some View {
        List {
            NavigationLink(destination: CounterView(state: state)) {
                Text("Counter demo")
            }
            NavigationLink(destination: FavoritePrimesView(state: state)) {
                Text("Favorites primes")
            }
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
