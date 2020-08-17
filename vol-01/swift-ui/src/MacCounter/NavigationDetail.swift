//
//  NavigationDetail.swift
//  MacCounter
//
//  Created by phucld on 2/27/20.
//  Copyright © 2020 Dwarves Foundation. All rights reserved.
//

import SwiftUI

struct NavigationDetail<T: View>: View {
    let view: T
    
    var body: some View {
        ScrollView {
            view
            .padding()
            .frame(maxWidth: 700)
        }
    }
}

struct NavigationDetail_Previews: PreviewProvider {
    static var previews: some View {
        return NavigationDetail(view: Text("Abc"))
    }
}
