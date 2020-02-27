//
//  ContentView.swift
//  Demo
//
//  Created by Trung Phan on 2/14/20.
//  Copyright © 2020 Dwarvesf. All rights reserved.
//

import SwiftUI
import UIKit

struct ContentView: View {
    
    @State var aligment: HorizontalAlignment = .leading
    
    var body: some View {
        VStack {
            VStack(alignment:aligment) {
                Rectangle().fill(Color.blue)
                    .frame(width: 100, height: 100)
                HStack{Spacer()}
            }
            .animation(Animation.spring(dampingFraction: 0.7))
            
            Button("Tap to Animate") {
                    if self.aligment == .leading {
                        self.aligment = .trailing
                    } else {
                        self.aligment = .leading
                    }
            }
            
            UIKitViewAnimation()
            
        }.padding()
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

struct UIKitViewAnimation: UIViewRepresentable {
    func updateUIView(_ uiView: UIView, context: UIViewRepresentableContext<UIKitViewAnimation>) {
        //
    }
    
func makeUIView(context: UIViewRepresentableContext<UIKitViewAnimation>) -> UIView {
    return Bundle.main.loadNibNamed("AnimateView", owner: self, options: nil)?.first as! UIView
    }
}
