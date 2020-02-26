//
//  NavigationMaster.swift
//  MacCounter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct NavigationMaster: View {
    @Binding var selectedFeature: Feature?

    var body: some View {
        List(selection: $selectedFeature) {
            Text("Count prime").tag(Feature.countPrime)
            Text("Favorites primes").tag(Feature.favoritesPrime)
        }
        .listStyle(SidebarListStyle())
        .frame(minWidth: 225, maxWidth: 300)
    }
}

struct NavigationMaster_Previews: PreviewProvider {
    static var previews: some View {
        NavigationMaster(selectedFeature: .constant(.countPrime))
    }
}
