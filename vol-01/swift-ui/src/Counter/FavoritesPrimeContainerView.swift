//
//  FavoritesPrimeContainerView.swift
//  Counter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct FavoritesPrimeContainerView: View {
    @ObservedObject var state: AppState
    
    var body: some View {
        FavoritePrimesView(state: state)
        .navigationBarTitle(Text("Favorite Primes"))

    }
}

struct FavoritesPrimeContainerView_Previews: PreviewProvider {
    static var previews: some View {
        FavoritesPrimeContainerView(state: AppState())
    }
}
