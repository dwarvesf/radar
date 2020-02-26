//
//  HomeView.swift
//  Counter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct CounterView: View {
    @ObservedObject var state: AppState
    @State var isShowModal = false
    @State var alertNthPrime: PrimeAlert?
    
    var body: some View {
        VStack {
            HStack {
                Button(action: { self.state.count -= 1 }) {
                    Text("-")
                }
                
                Text("\(self.state.count)")
                    .foregroundColor(state.count.isPrime() ? .green : .red)
                
                Button(action: { self.state.count += 1 }) {
                    Text("+")
                }
            }
            Button(action: { self.isShowModal = true }) {
                Text("Is this prime?")
            }
            
            Button(action: { nthPrime(self.state.count) { prime in
                guard let prime = prime else {return}
                self.alertNthPrime = PrimeAlert(prime: prime)
            }
            }) {
                Text("What is the \(ordinal(self.state.count)) prime?")
            }
        }
        .navigationBarTitle(Text("Counter demo"))
        .navigationBarTitle(Text("Counter demo"), displayMode: .inline)
        .alert(item: self.$alertNthPrime, content: { n in
            Alert(title: Text("The \(ordinal(self.state.count)) prime is \(n.prime)"), dismissButton: Alert.Button.default(Text("Ok")))
        })
            .sheet(isPresented: $isShowModal) { IsPrimeModalView(state: self.state) }
    }
    
    private func ordinal(_ n: Int) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .ordinal
        return formatter.string(for: n) ?? ""
    }
}

#if DEBUG
struct CounterView_Previews : PreviewProvider {
    static var previews: some View {
        CounterView(state: AppState())
    }
}
#endif
