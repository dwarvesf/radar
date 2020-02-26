//
//  FavoritePrimesView.swift
//  Counter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct FavoritePrimesView: View {
    @ObservedObject var state: AppState
    
    var body: some View {
        List {
            ForEach(self.state.favoritePrimes, id: \.self) { prime in
                Text("\(prime)")
            }
            .onDelete { indexSet in
                for index in indexSet {
                    self.state.favoritePrimes.remove(at: index)
                }
            }
        }
    }
}


struct FavoritePrimesView_Previews: PreviewProvider {
    static var previews: some View {
        FavoritePrimesView(state: AppState())
    }
}
