//
//  IsPrimeModalView.swift
//  Counter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct IsPrimeModalView: View {
    @ObservedObject var state: AppState
    
    var body: some View {
        VStack {
            if self.state.count.isPrime() {
                Text("\(self.state.count) is prime 🎉")
                if self.state.favoritePrimes.contains(self.state.count) {
                    Button(action: { self.state.favoritePrimes.removeAll(where: { $0 == self.state.count }) }) {
                        Text("Remove from favorite primes")
                    }
                } else {
                    Button(action: { self.state.favoritePrimes.append(self.state.count) }) {
                        Text("Save to favorite primes")
                    }
                }
            } else {
                Text("\(self.state.count) is not prime :(")
            }
        }
    }
}

struct IsPrimeModalView_Previews: PreviewProvider {
    static var previews: some View {
        IsPrimeModalView(state: AppState())
    }
}
