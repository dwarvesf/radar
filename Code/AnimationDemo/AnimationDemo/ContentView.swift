import SwiftUI

struct ContentView: View {
    
    var body: some View {
        NavigationView {
            List {
                Section(header: Text("Part 1: Path Animations")) {
                    NavigationLink(destination: Example1(), label: {
                        Text("Example 1 (sides: Double)")
                    })
                    
                    NavigationLink(destination: Example2(), label: {
                        Text("Example 2 (sides: Int)")
                    })
                    
                    NavigationLink(destination: Example3(), label: {
                        Text("Example 3 (sides & scale)")
                    })
                    
                    NavigationLink(destination: Example4(), label: {
                        Text("Example 4 (vertex to vertex)")
                    })
                    
                    NavigationLink(destination: Example5(), label: {
                        Text("Example 5 (clock)")
                    })
                    
                    NavigationLink(destination: Example6(), label: {
                        Text("Example 6 (metal)")
                    })
                }
                
                Section(header: Text("Part 2: Geometry Effect")) {
                    NavigationLink(destination: Example7(), label: {
                        Text("Example 7 (skew)")
                    })
                    
                    NavigationLink(destination: Example8(), label: {
                        Text("Example 8 (rotating card)")
                    })
                    
                    NavigationLink(destination: Example9(), label: {
                        Text("Example 9 (follow path)")
                    })
                }
                
                Section(header: Text("Part 3: Animatable Modifier")) {
                    NavigationLink(destination: Example10(), label: {
                        Text("Example 10 (progress indicator)")
                    })
                    
                    NavigationLink(destination: Example11(), label: {
                        Text("Example 11 (gradient)")
                    })

                    NavigationLink(destination: Example12(), label: {
                        Text("Example 12 (wave text)")
                    })
                    
                    NavigationLink(destination: Example13(), label: {
                        Text("Example 13 (counter)")
                    })
                    
                    NavigationLink(destination: Example14(), label: {
                        Text("Example 14 (animatable text color)")
                    })

                }

            }.navigationBarTitle("SwiftUI Lab")
        }
    }
}
struct Conten_Preview: PreviewProvider{
    static var previews: some View {
        ContentView()
    }
}

struct MyButton: View {
    let label: String
    var font: Font = .title
    var textColor: Color = .white
    let action: () -> ()
    
    var body: some View {
        Button(action: {
            self.action()
        }, label: {
            Text(label)
                .font(font)
                .padding(10)
                .frame(width: 70)
                .background(RoundedRectangle(cornerRadius: 10).foregroundColor(Color.green).shadow(radius: 2))
                .foregroundColor(textColor)
            
        })
    }
}

// MARK: - Part 1: Path Animations
// MARK: Example 1: Polygon animatable
struct Example1: View {
    @State private var sides: Double = 4
    
    var body: some View {
        VStack {
            Example1PolygonShape(sides: sides)
                .stroke(Color.blue, lineWidth: 3)
                .padding(20)
                .animation(.easeInOut(duration: 1.0))
                .layoutPriority(1)
            
            Text("\(Int(sides)) sides").font(.headline)
            
            HStack(spacing: 20) {
                MyButton(label: "1") {
                    self.sides = 1.0
                }
                
                MyButton(label: "3") {
                    self.sides = 3.0
                }
                
                MyButton(label: "7") {
                    self.sides = 7.0
                }
                
                MyButton(label: "30") {
                    self.sides = 30.0
                }
                
            }.navigationBarTitle("Example 1").padding(.bottom, 50)
        }
    }
}

struct Example1PolygonShape: Shape {
    var sides: Double
    
    var animatableData: Double {
        get { return sides }
        set { sides = newValue }
    }
    
    func path(in rect: CGRect) -> Path {
        
        // hypotenuse
        let h = Double(min(rect.size.width, rect.size.height)) / 2.0
        
        // center
        let c = CGPoint(x: rect.size.width / 2.0, y: rect.size.height / 2.0)
        
        var path = Path()
        
        let extra: Int = Double(sides) != Double(Int(sides)) ? 1 : 0
        
        for i in 0..<Int(sides) + extra {
            let angle = (Double(i) * (360.0 / Double(sides))) * Double.pi / 180
            
            // Calculate vertex
            let pt = CGPoint(x: c.x + CGFloat(cos(angle) * h), y: c.y + CGFloat(sin(angle) * h))
            
            if i == 0 {
                path.move(to: pt) // move to first vertex
            } else {
                path.addLine(to: pt) // draw line to next vertex
            }
        }
        
        path.closeSubpath()
        
        return path
    }
}

// MARK: - Example 2: Polygon with sides as Integer
struct Example2: View {
    @State private var sides: Int = 4
    @State private var duration: Double = 1.0
    
    var body: some View {
        VStack {
            Example2PolygonShape(sides: sides)
                .stroke(Color.red, lineWidth: 3)
                .padding(20)
                .animation(.easeInOut(duration: duration))
                .layoutPriority(1)
            
            Text("\(Int(sides)) sides").font(.headline)
            
            HStack(spacing: 20) {
                MyButton(label: "1") {
                    self.sides = 1
                }
                
                MyButton(label: "3") {
                    self.sides = 3
                }
                
                MyButton(label: "7") {
                    self.sides = 7
                }
                
                MyButton(label: "30") {
                    self.sides = 30
                }
                
            }.navigationBarTitle("Example 2").padding(.bottom, 50)
        }
    }
}

struct Example2PolygonShape: Shape {
    var sides: Int
    private var sidesAsDouble: Double
    
    var animatableData: Double {
        get { return sidesAsDouble }
        set { sidesAsDouble = newValue }
    }
    
    init(sides: Int) {
        self.sides = sides
        self.sidesAsDouble = Double(sides)
    }
    
    func path(in rect: CGRect) -> Path {
        
        // hypotenuse
        let h = Double(min(rect.size.width, rect.size.height)) / 2.0
        
        // center
        let c = CGPoint(x: rect.size.width / 2.0, y: rect.size.height / 2.0)
        
        var path = Path()
        
        let extra: Int = sidesAsDouble != Double(Int(sidesAsDouble)) ? 1 : 0
        
        for i in 0..<Int(sidesAsDouble) + extra {
            let angle = (Double(i) * (360.0 / sidesAsDouble)) * Double.pi / 180
            
            // Calculate vertex
            let pt = CGPoint(x: c.x + CGFloat(cos(angle) * h), y: c.y + CGFloat(sin(angle) * h))
            
            if i == 0 {
                path.move(to: pt) // move to first vertex
            } else {
                path.addLine(to: pt) // draw line to next vertex
            }
        }
        
        path.closeSubpath()
        
        return path
    }
}

// MARK: - Example 3: Polygon with multiple animatable paramters
struct Example3: View {
    @State private var sides: Double = 4
    @State private var duration: Double = 1.0
    @State private var scale: Double = 1.0
    
    var body: some View {
        VStack {
            Example3PolygonShape(sides: sides, scale: scale)
                .stroke(Color.purple, lineWidth: 5)
                .padding(20)
                .animation(.easeInOut(duration: duration))
                .layoutPriority(1)
            
            Text("\(Int(sides)) sides, \(String(format: "%.2f", scale as Double)) scale")
            
            HStack(spacing: 20) {
                MyButton(label: "1") {
                    self.sides = 1.0
                    self.scale = 1.0
                }
                
                MyButton(label: "3") {
                    self.sides = 3.0
                    self.scale = 0.7
                }
                
                MyButton(label: "7") {
                    self.sides = 7.0
                    self.scale = 0.4
                }
                
                MyButton(label: "30") {
                    self.sides = 30.0
                    self.scale = 1.0
                }
                
            }
        }.navigationBarTitle("Example 3").padding(.bottom, 50)
    }
}


struct Example3PolygonShape: Shape {
    var sides: Double
    var scale: Double
    
    var animatableData: AnimatablePair<Double, Double> {
        get { AnimatablePair(sides, scale) }
        set {
            sides = newValue.first
            scale = newValue.second
        }
    }
    
    func path(in rect: CGRect) -> Path {
        // hypotenuse
        let h = Double(min(rect.size.width, rect.size.height)) / 2.0 * scale
        
        // center
        let c = CGPoint(x: rect.size.width / 2.0, y: rect.size.height / 2.0)
        
        var path = Path()
        
        let extra: Int = sides != Double(Int(sides)) ? 1 : 0
        
        for i in 0..<Int(sides) + extra {
            let angle = (Double(i) * (360.0 / sides)) * (Double.pi / 180)
            
            // Calculate vertex
            let pt = CGPoint(x: c.x + CGFloat(cos(angle) * h), y: c.y + CGFloat(sin(angle) * h))
            
            if i == 0 {
                path.move(to: pt) // move to first vertex
            } else {
                path.addLine(to: pt) // draw line to next vertex
            }
        }
        
        path.closeSubpath()
        
        return path
    }
}

// MARK: - Example 4: Polygon with lines vertex-to-vertex
struct Example4: View {
    @State private var sides: Double = 4
    @State private var scale: Double = 1.0
    
    
    var body: some View {
        VStack {
            Example4PolygonShape(sides: sides, scale: scale)
                .stroke(Color.pink, lineWidth: (sides < 3) ? 10 : ( sides < 7 ? 5 : 2))
                .padding(20)
                .animation(.easeInOut(duration: 3.0))
                .layoutPriority(1)
            
            
            Text("\(Int(sides)) sides, \(String(format: "%.2f", scale as Double)) scale")
            
            Slider(value: $sides, in: 0...30)
            
            HStack(spacing: 20) {
                MyButton(label: "1") {
                    self.sides = 1.0
                    self.scale = 1.0
                }
                
                MyButton(label: "3") {
                    self.sides = 3.0
                    self.scale = 1.0
                }
                
                MyButton(label: "7") {
                    self.sides = 7.0
                    self.scale = 1.0
                }
                
                MyButton(label: "30") {
                    self.sides = 30.0
                    self.scale = 1.0
                }
                
            }
        }.navigationBarTitle("Example 4").padding(.bottom, 50)
    }
}


struct Example4PolygonShape: Shape {
    var sides: Double
    var scale: Double
    
    var animatableData: AnimatablePair<Double, Double> {
        get { AnimatablePair(sides, scale) }
        set {
            sides = newValue.first
            scale = newValue.second
        }
    }
    
    func path(in rect: CGRect) -> Path {
        // hypotenuse
        let h = Double(min(rect.size.width, rect.size.height)) / 2.0 * scale
        
        // center
        let c = CGPoint(x: rect.size.width / 2.0, y: rect.size.height / 2.0)
        
        var path = Path()
        
        let extra: Int = sides != Double(Int(sides)) ? 1 : 0
        
        var vertex: [CGPoint] = []
        
        for i in 0..<Int(sides) + extra {
            
            let angle = (Double(i) * (360.0 / sides)) * (Double.pi / 180)
            
            // Calculate vertex
            let pt = CGPoint(x: c.x + CGFloat(cos(angle) * h), y: c.y + CGFloat(sin(angle) * h))
            
            vertex.append(pt)
            
            if i == 0 {
                path.move(to: pt) // move to first vertex
            } else {
                path.addLine(to: pt) // draw line to next vertex
            }
        }
        
        path.closeSubpath()
        
        // Draw vertex-to-vertex lines
        drawVertexLines(path: &path, vertex: vertex, n: 0)
        
        return path
    }
    
    func drawVertexLines(path: inout Path, vertex: [CGPoint], n: Int) {
        
        if (vertex.count - n) < 3 { return }
        
        for i in (n+2)..<min(n + (vertex.count-1), vertex.count) {
            path.move(to: vertex[n])
            path.addLine(to: vertex[i])
        }
        
        drawVertexLines(path: &path, vertex: vertex, n: n+1)
    }
}

// MARK: - Example 5: Clock Shape
struct Example5: View {
    @State private var time: ClockTime = ClockTime(9, 50, 5)
    @State private var duration: Double = 2.0
    
    var body: some View {
        VStack {
            ClockShape(clockTime: time)
                .stroke(Color.blue, lineWidth: 3)
                .padding(20)
                .animation(.easeInOut(duration: duration))
                .layoutPriority(1)
            
            
            Text("\(time.asString())")

            HStack(spacing: 20) {
                MyButton(label: "9:51:45", font: .footnote, textColor: .black) {
                    self.duration = 2.0
                    self.time = ClockTime(9, 51, 45)
                }
                
                MyButton(label: "9:51:15", font: .footnote, textColor: .black) {
                    self.duration = 2.0
                    self.time = ClockTime(9, 51, 15)
                }
                
                MyButton(label: "9:52:15", font: .footnote, textColor: .black) {
                    self.duration = 2.0
                    self.time = ClockTime(9, 52, 15)
                }
                
                MyButton(label: "10:01:45", font: .caption, textColor: .black) {
                    self.duration = 10.0
                    self.time = ClockTime(10, 01, 45)
                }
                
            }
        }.navigationBarTitle("Example 5").padding(.bottom, 50)
    }
    
}


struct ClockShape: Shape {
    var clockTime: ClockTime
    
    var animatableData: ClockTime {
        get { clockTime }
        set { clockTime = newValue }
    }
    
    func path(in rect: CGRect) -> Path {
        var path = Path()
        
        let radius = min(rect.size.width / 2.0, rect.size.height / 2.0)
        let center = CGPoint(x: rect.size.width / 2.0, y: rect.size.height / 2.0)
        
        let hHypotenuse = Double(radius) * 0.5 // hour needle length
        let mHypotenuse = Double(radius) * 0.7 // minute needle length
        let sHypotenuse = Double(radius) * 0.9 // second needle length
        
        let hAngle: Angle = .degrees(Double(clockTime.hours) / 12 * 360 - 90)
        let mAngle: Angle = .degrees(Double(clockTime.minutes) / 60 * 360 - 90)
        let sAngle: Angle = .degrees(Double(clockTime.seconds) / 60 * 360 - 90)
        
        let hourNeedle = CGPoint(x: center.x + CGFloat(cos(hAngle.radians) * hHypotenuse), y: center.y + CGFloat(sin(hAngle.radians) * hHypotenuse))
        let minuteNeedle = CGPoint(x: center.x + CGFloat(cos(mAngle.radians) * mHypotenuse), y: center.y + CGFloat(sin(mAngle.radians) * mHypotenuse))
        let secondNeedle = CGPoint(x: center.x + CGFloat(cos(sAngle.radians) * sHypotenuse), y: center.y + CGFloat(sin(sAngle.radians) * sHypotenuse))
        
        path.addArc(center: center, radius: radius, startAngle: .degrees(0), endAngle: .degrees(360), clockwise: true)

        path.move(to: center)
        path.addLine(to: hourNeedle)
        path = path.strokedPath(StrokeStyle(lineWidth: 3.0))

        path.move(to: center)
        path.addLine(to: minuteNeedle)
        path = path.strokedPath(StrokeStyle(lineWidth: 3.0))

        path.move(to: center)
        path.addLine(to: secondNeedle)
        path = path.strokedPath(StrokeStyle(lineWidth: 1.0))
        
        return path
    }
}

struct ClockTime {
    var hours: Int      // Hour needle should jump by integer numbers
    var minutes: Int    // Minute needle should jump by integer numbers
    var seconds: Double // Second needle should move smoothly
    
    // Initializer with hour, minute and seconds
    init(_ h: Int, _ m: Int, _ s: Double) {
        self.hours = h
        self.minutes = m
        self.seconds = s
    }
    
    // Initializer with total of seconds
    init(_ seconds: Double) {
        let h = Int(seconds) / 3600
        let m = (Int(seconds) - (h * 3600)) / 60
        let s = seconds - Double((h * 3600) + (m * 60))
        
        self.hours = h
        self.minutes = m
        self.seconds = s
    }
    
    // compute number of seconds
    var asSeconds: Double {
        return Double(self.hours * 3600 + self.minutes * 60) + self.seconds
    }
    
    // show as string
    func asString() -> String {
        return String(format: "%2i", self.hours) + ":" + String(format: "%02i", self.minutes) + ":" + String(format: "%02.0f", self.seconds)
    }
}

extension ClockTime: VectorArithmetic {
    static func -= (lhs: inout ClockTime, rhs: ClockTime) {
        lhs = lhs - rhs
    }
    
    static func - (lhs: ClockTime, rhs: ClockTime) -> ClockTime {
        return ClockTime(lhs.asSeconds - rhs.asSeconds)
    }
    
    static func += (lhs: inout ClockTime, rhs: ClockTime) {
        lhs = lhs + rhs
    }
    
    static func + (lhs: ClockTime, rhs: ClockTime) -> ClockTime {
        return ClockTime(lhs.asSeconds + rhs.asSeconds)
    }
    
    mutating func scale(by rhs: Double) {
        var s = Double(self.asSeconds)
        s.scale(by: rhs)
        
        let ct = ClockTime(s)
        self.hours = ct.hours
        self.minutes = ct.minutes
        self.seconds = ct.seconds
    }
    
    var magnitudeSquared: Double {
        1
    }
    
    static var zero: ClockTime {
        return ClockTime(0, 0, 0)
    }
    
}

// MARK: - Example 6: Clock Shape
struct Example6: View {
    var body: some View {
        
        VStack {
            FlowerView().drawingGroup()
        }.padding(20)
    }
    
}

struct FlowerView: View {
    @State private var animate = false
    
    let colors: [Color] = [.red, .orange, .yellow, .green, .blue, .purple, .pink]
    
    var body: some View {
        ZStack {
            ForEach(0..<7) { i in
                FlowerColor(petals: self.getPetals(i), length: self.getLength(i), color: self.colors[i])
            }
            .rotationEffect(Angle(degrees: animate ? 360 : 0))
            .onAppear {
                withAnimation(Animation.easeInOut(duration: 25.0).repeatForever()) {
                    self.animate = true
                }
            }
        }
    }
    
    func getLength(_ i: Int) -> Double {
        return 1 - (Double(i) * 1 / 7)
    }
    
    func getPetals(_ i: Int) -> Int {
        return i * 2 + 15
    }
}

struct FlowerColor: View {
    let petals: Int
    let length: Double
    let color: Color
    
    @State private var animate = false
    
    var body: some View {
        let petalWidth1 = Angle(degrees: 2)
        let petalWidth2 = Angle(degrees: 360 / Double(self.petals)) * 2
        
        return GeometryReader { proxy in
            
            ForEach(0..<self.petals) { i in
                PetalShape(angle: Angle(degrees: Double(i) * 360 / Double(self.petals)), arc: self.animate ? petalWidth1 : petalWidth2, length: self.animate ? self.length : self.length * 0.9)
                    .fill(RadialGradient(gradient: Gradient(colors: [self.color.opacity(0.2), self.color]), center: UnitPoint(x: 0.5, y: 0.5), startRadius: 0.1 * min(proxy.size.width, proxy.size.height) / 2.0, endRadius: min(proxy.size.width, proxy.size.height) / 2.0))
            }
            
        }.onAppear {
            withAnimation(Animation.easeInOut(duration: 1.5).repeatForever()) {
                self.animate = true
            }
        }
    }
}

struct PetalShape: Shape {
    let angle: Angle
    var arc: Angle
    var length: Double
    
    var animatableData: AnimatablePair<Double, Double> {
        get { AnimatablePair(arc.degrees, length) }
        set {
            arc = Angle(degrees: newValue.first)
            length = newValue.second
        }
    }
    
    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let hypotenuse = Double(min(rect.width, rect.height)) / 2.0 * length
        
        let sep = arc / 2
        
        let to = CGPoint(x: CGFloat(cos(angle.radians) * Double(hypotenuse)) + center.x,
                         y: CGFloat(sin(angle.radians) * Double(hypotenuse)) + center.y)
        
        let ctrl1 = CGPoint(x: CGFloat(cos((angle + sep).radians) * Double(hypotenuse)) + center.x,
                            y: CGFloat(sin((angle + sep).radians) * Double(hypotenuse)) + center.y)
        
        let ctrl2 = CGPoint(x: CGFloat(cos((angle - sep).radians) * Double(hypotenuse)) + center.x,
                            y: CGFloat(sin((angle - sep).radians) * Double(hypotenuse)) + center.y)
        
        
        var path = Path()
        
        path.move(to: center)
        path.addQuadCurve(to: to, control: ctrl1)
        path.addQuadCurve(to: center, control: ctrl2)
        
        return path
    }
    
}

// MARK: -
// MARK: Part 2: Geometry Effects
// MARK: Exmaple 6 - Skew
struct Example7: View {
    @State private var moveIt = false

    var body: some View {
        let animation = Animation.easeInOut(duration: 1.0)

        return VStack {
            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .red)
                .animation(animation)

            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .orange)
                .animation(animation.delay(0.1))

            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .yellow)
            .animation(animation.delay(0.2))

            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .green)
                .animation(animation.delay(0.3))

            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .blue)
                .animation(animation.delay(0.4))

            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .purple)
            .animation(animation.delay(0.5))

            LabelView(text: "The SwiftUI Lab", offset: moveIt ? 120 : -120, pct: moveIt ? 1 : 0, backgroundColor: .pink)
            .animation(animation.delay(0.6))

            Button(action: { self.moveIt.toggle() }) { Text("Animate") }.padding(.top, 50)
        }
        .onTapGesture { self.moveIt.toggle() }
        .navigationBarTitle("Example 7")

    }
}

struct LabelView: View {
    let text: String
    var offset: CGFloat
    var pct: CGFloat
    let backgroundColor: Color

    var body: some View {

        Text("The SwiftUI Lab")
            .font(.headline)
            .padding(5)
            .background(RoundedRectangle(cornerRadius: 5).foregroundColor(backgroundColor))
            .foregroundColor(Color.black)
            .modifier(SkewedOffset(offset: offset, pct: pct, goingRight: offset > 0))

    }
}

struct SkewedOffset: GeometryEffect {
    var offset: CGFloat
    var pct: CGFloat
    let goingRight: Bool

    init(offset: CGFloat, pct: CGFloat, goingRight: Bool) {
        self.offset = offset
        self.pct = pct
        self.goingRight = goingRight
    }

    var animatableData: AnimatablePair<CGFloat, CGFloat> {
        get { return AnimatablePair<CGFloat, CGFloat>(offset, pct) }
        set {
            offset = newValue.first
            pct = newValue.second
        }
    }

    func effectValue(size: CGSize) -> ProjectionTransform {
        var skew: CGFloat

        if pct < 0.2 {
            skew = (pct * 5) * 0.5 * (goingRight ? -1 : 1)
        } else if pct > 0.8 {
            skew = ((1 - pct) * 5) * 0.5 * (goingRight ? -1 : 1)
        } else {
            skew = 0.5 * (goingRight ? -1 : 1)
        }

        return ProjectionTransform(CGAffineTransform(a: 1, b: 0, c: skew, d: 1, tx: offset, ty: 0))
    }
}

// MARK: - Example 8 - Rotating Card
struct Example8: View {
    var body: some View {
        HStack {
            Spacer()
            RotatingCard()
            Spacer()
            }.background(Color.black).navigationBarTitle("Example 8")
    }
}

struct RotatingCard: View {
    @State private var flipped = false
    @State private var animate3d = false
    @State private var rotate = false
    @State private var imgIndex = 0
    
    let images = ["diamonds-7", "clubs-8", "diamonds-6", "clubs-b", "hearts-2", "diamonds-b"]
    
    var body: some View {
        let binding = Binding<Bool>(get: { self.flipped }, set: { self.updateBinding($0) })
        
        return VStack {
            Spacer()
            Image(flipped ? "back" : images[imgIndex]).resizable()
                .frame(width: 212, height: 320)
                .modifier(FlipEffect(flipped: binding, angle: animate3d ? 360 : 0, axis: (x: 1, y: 5)))
                .rotationEffect(Angle(degrees: rotate ? 0 : 360))
                .onAppear {
                    withAnimation(Animation.linear(duration: 4.0).repeatForever(autoreverses: false)) {
                        self.animate3d = true
                    }
                    
                    withAnimation(Animation.linear(duration: 8.0).repeatForever(autoreverses: false)) {
                        self.rotate = true
                    }
            }
            Spacer()
        }
    }
    
    func updateBinding(_ value: Bool) {
        // If card was just flipped and at front, change the card
        if flipped != value && !flipped {
            self.imgIndex = self.imgIndex+1 < self.images.count ? self.imgIndex+1 : 0
        }
        
        flipped = value
    }
}

struct FlipEffect: GeometryEffect {
    
    var animatableData: Double {
        get { angle }
        set { angle = newValue }
    }
    
    @Binding var flipped: Bool
    var angle: Double
    let axis: (x: CGFloat, y: CGFloat)
    
    func effectValue(size: CGSize) -> ProjectionTransform {
        
        // We schedule the change to be done after the view has finished drawing,
        // otherwise, we would receive a runtime error, indicating we are changing
        // the state while the view is being drawn.
        DispatchQueue.main.async {
            self.flipped = self.angle >= 90 && self.angle < 270
        }
        
        let a = CGFloat(Angle(degrees: angle).radians)
        
        var transform3d = CATransform3DIdentity;
        transform3d.m34 = -1/max(size.width, size.height)
        
        transform3d = CATransform3DRotate(transform3d, a, axis.x, axis.y, 0)
        transform3d = CATransform3DTranslate(transform3d, -size.width/2.0, -size.height/2.0, 0)
        
        let affineTransform = ProjectionTransform(CGAffineTransform(translationX: size.width/2.0, y: size.height / 2.0))
        
        return ProjectionTransform(transform3d).concatenating(affineTransform)
    }
}

// MARK: - Example 9 - Follow Path
struct Example9: View {
    @State private var flag = false

    var body: some View {
        GeometryReader { proxy in
            ZStack(alignment: .topLeading) {

                // Draw the Infinity Shape
                InfinityShape().stroke(Color.purple, style: StrokeStyle(lineWidth: 5, lineCap: .round, lineJoin: .miter, miterLimit: 0, dash: [7, 7], dashPhase: 0))
                    .foregroundColor(.blue)
                    .frame(width: proxy.size.width, height: 300)

                // Animate movement of Image
                Image(systemName: "airplane").resizable().foregroundColor(Color.red)
                    .frame(width: 50, height: 50).offset(x: -25, y: -25)
                    .modifier(FollowEffect(pct: self.flag ? 1 : 0, path: InfinityShape.createInfinityPath(in: CGRect(x: 0, y: 0, width: proxy.size.width, height: 300)), rotate: true))
                    .onAppear {
                        withAnimation(Animation.linear(duration: 4.0).repeatForever(autoreverses: false)) {
                            self.flag.toggle()
                        }
                    }

                }.frame(alignment: .topLeading)
        }
        .padding(20)
        .navigationBarTitle("Example 9")

    }
}

struct FollowEffect: GeometryEffect {
    var pct: CGFloat = 0
    let path: Path
    var rotate = true

    var animatableData: CGFloat {
        get { return pct }
        set { pct = newValue }
    }

    func effectValue(size: CGSize) -> ProjectionTransform {

        if !rotate {
            let pt = percentPoint(pct)

            return ProjectionTransform(CGAffineTransform(translationX: pt.x, y: pt.y))
        } else {
            // Calculate rotation angle, by calculating an imaginary line between two points
            // in the path: the current position (1) and a point very close behind in the path (2).
            let pt1 = percentPoint(pct)
            let pt2 = percentPoint(pct - 0.01)

            let a = pt2.x - pt1.x
            let b = pt2.y - pt1.y

            let angle = a < 0 ? atan(Double(b / a)) : atan(Double(b / a)) - Double.pi

            let transform = CGAffineTransform(translationX: pt1.x, y: pt1.y).rotated(by: CGFloat(angle))

            return ProjectionTransform(transform)
        }
    }

    func percentPoint(_ percent: CGFloat) -> CGPoint {

        let pct = percent > 1 ? 0 : (percent < 0 ? 1 : percent)

        let f = pct > 0.999 ? CGFloat(1-0.001) : pct
        let t = pct > 0.999 ? CGFloat(1) : pct + 0.001
        let tp = path.trimmedPath(from: f, to: t)

        return CGPoint(x: tp.boundingRect.midX, y: tp.boundingRect.midY)
    }
}

struct InfinityShape: Shape {
    func path(in rect: CGRect) -> Path {
        return InfinityShape.createInfinityPath(in: rect)
    }

    static func createInfinityPath(in rect: CGRect) -> Path {
        let height = rect.size.height
        let width = rect.size.width
        let heightFactor = height/4
        let widthFactor = width/4

        var path = Path()

        path.move(to: CGPoint(x:widthFactor, y: heightFactor * 3))
        path.addCurve(to: CGPoint(x:widthFactor, y: heightFactor), control1: CGPoint(x:0, y: heightFactor * 3), control2: CGPoint(x:0, y: heightFactor))

        path.move(to: CGPoint(x:widthFactor, y: heightFactor))
        path.addCurve(to: CGPoint(x:widthFactor * 3, y: heightFactor * 3), control1: CGPoint(x:widthFactor * 2, y: heightFactor), control2: CGPoint(x:widthFactor * 2, y: heightFactor * 3))

        path.move(to: CGPoint(x:widthFactor * 3, y: heightFactor * 3))
        path.addCurve(to: CGPoint(x:widthFactor * 3, y: heightFactor), control1: CGPoint(x:widthFactor * 4 + 5, y: heightFactor * 3), control2: CGPoint(x:widthFactor * 4 + 5, y: heightFactor))

        path.move(to: CGPoint(x:widthFactor * 3, y: heightFactor))
        path.addCurve(to: CGPoint(x:widthFactor, y: heightFactor * 3), control1: CGPoint(x:widthFactor * 2, y: heightFactor), control2: CGPoint(x:widthFactor * 2, y: heightFactor * 3))

        return path
    }
}

// MARK: - Example 10
struct Example10: View {
    @State private var percent: CGFloat = 0
    
    var body: some View {
        VStack {
            Spacer()
            Color.clear.overlay(Indicator(pct: self.percent))
            
            Spacer()
            HStack(spacing: 10) {
                MyButton(label: "0%", font: .headline) { withAnimation(.easeInOut(duration: 1.0)) { self.percent = 0 } }

                MyButton(label: "27%", font: .headline) { withAnimation(.easeInOut(duration: 1.0)) { self.percent = 0.27 } }

                MyButton(label: "100%", font: .headline) { withAnimation(.easeInOut(duration: 1.0)) { self.percent = 1.0 } }
            }
        }.navigationBarTitle("Example 10")
    }
}

struct Indicator: View {
    var pct: CGFloat
    
    var body: some View {
        return Circle()
            .fill(LinearGradient(gradient: Gradient(colors: [.blue, .purple]), startPoint: .topLeading, endPoint: .bottomTrailing))
            .frame(width: 150, height: 150)
            .modifier(PercentageIndicator(pct: self.pct))
    }
}

struct PercentageIndicator: AnimatableModifier {
    var pct: CGFloat = 0
    
    var animatableData: CGFloat {
        get { pct }
        set { pct = newValue }
    }
    
    func body(content: Content) -> some View {
        content
            .overlay(ArcShape(pct: pct).foregroundColor(.red))
            .overlay(LabelView(pct: pct))
    }
    
    struct ArcShape: Shape {
        let pct: CGFloat
        
        func path(in rect: CGRect) -> Path {

            var p = Path()

            p.addArc(center: CGPoint(x: rect.width / 2.0, y:rect.height / 2.0),
                     radius: rect.height / 2.0 + 5.0,
                     startAngle: .degrees(0),
                     endAngle: .degrees(360.0 * Double(pct)), clockwise: false)

            return p.strokedPath(.init(lineWidth: 10, dash: [6, 3], dashPhase: 10))
        }
    }
    
    struct LabelView: View {
        let pct: CGFloat
        
        var body: some View {
            Text("\(Int(pct * 100)) %")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundColor(.white)
        }
    }
}

// MARK: - Example 11
struct Example11: View {
    @State private var animate = false
    
    var body: some View {
        
        let gradient1: [UIColor] = [.blue, .green]
        let gradient2: [UIColor] = [.red, .yellow]
        
        return VStack {
            Spacer()
            
            Color.clear.frame(width: 200, height: 200)
                .overlay(Color.clear.modifier(AnimatableGradient(from: gradient1, to: gradient2, pct: animate ? 1 : 0)))
            
            Spacer()
            
            Button("Toggle Gradient") {
                withAnimation(.easeInOut(duration: 1.0)) {
                    self.animate.toggle()
                }
            }
        }.navigationBarTitle("Example 11")
    }
}

struct AnimatableGradient: AnimatableModifier {
    let from: [UIColor]
    let to: [UIColor]
    var pct: CGFloat = 0
    
    var animatableData: CGFloat {
        get { pct }
        set { pct = newValue }
    }
    
    func body(content: Content) -> some View {
        var gColors = [Color]()
        
        for i in 0..<from.count {
            gColors.append(colorMixer(c1: from[i], c2: to[i], pct: pct))
        }
        
        return RoundedRectangle(cornerRadius: 15)
            .fill(LinearGradient(gradient: Gradient(colors: gColors),
                                 startPoint: UnitPoint(x: 0, y: 0),
                                 endPoint: UnitPoint(x: 1, y: 1)))
            .frame(width: 200, height: 200)
    }
    
    // This is a very basic implementation of a color interpolation
    // between two values.
    func colorMixer(c1: UIColor, c2: UIColor, pct: CGFloat) -> Color {
        guard let cc1 = c1.cgColor.components else { return Color(c1) }
        guard let cc2 = c2.cgColor.components else { return Color(c1) }
        
        let r = (cc1[0] + (cc2[0] - cc1[0]) * pct)
        let g = (cc1[1] + (cc2[1] - cc1[1]) * pct)
        let b = (cc1[2] + (cc2[2] - cc1[2]) * pct)

        return Color(red: Double(r), green: Double(g), blue: Double(b))
    }
}

// MARK: - Example 12
extension Double {
    var rad: Double { return self * .pi / 180 }
    var deg: Double { return self * 180 / .pi }
}

struct Example12: View {
    @State private var flag = false
    
    var body: some View {
        VStack {
            Spacer()
            Color.clear.overlay(WaveText("The SwiftUI Lab", waveWidth: 6, pct: flag ? 1.0 : 0.0).foregroundColor(.blue)).frame(height: 40)
            Color.clear.overlay(WaveText("swiftui-lab.com", waveWidth: 6, pct: flag ? 0.0 : 1.0, size: 18).foregroundColor(.green)).frame(height: 30)
            Spacer()
        }.onAppear {
            withAnimation(Animation.easeInOut(duration: 2.0).repeatForever()) {
                self.flag.toggle()
            }
        }.navigationBarTitle("Example 12")
    }
}

struct WaveText: View {
    let text: String
    let pct: Double
    let waveWidth: Int
    var size: CGFloat
    
    init(_ text: String, waveWidth: Int, pct: Double, size: CGFloat = 34) {
        self.text = text
        self.waveWidth = waveWidth
        self.pct = pct
        self.size = size
    }
    
    var body: some View {
        Text(text).foregroundColor(Color.clear).modifier(WaveTextModifier(text: text, waveWidth: waveWidth, pct: pct, size: size))
    }
    
    struct WaveTextModifier: AnimatableModifier {
        let text: String
        let waveWidth: Int
        var pct: Double
        var size: CGFloat
        
        var animatableData: Double {
            get { pct }
            set { pct = newValue }
        }
        
        func body(content: Content) -> some View {
            
            HStack(spacing: 0) {
                ForEach(Array(text.enumerated()), id: \.0) { (n, ch) in
                    Text(String(ch))
                        .font(Font.custom("Menlo", size: self.size).bold())
                        .scaleEffect(self.effect(self.pct, n, self.text.count, Double(self.waveWidth)))
                }
            }
        }
        
        func effect(_ pct: Double, _ n: Int, _ total: Int, _ waveWidth: Double) -> CGFloat {
            let n = Double(n)
            let total = Double(total)
            
            return CGFloat(1 + valueInCurve(pct: pct, total: total, x: n/total, waveWidth: waveWidth))
        }
        
        func valueInCurve(pct: Double, total: Double, x: Double, waveWidth: Double) -> Double {
            let chunk = waveWidth / total
            let m = 1 / chunk
            let offset = (chunk - (1 / total)) * pct
            let lowerLimit = (pct - chunk) + offset
            let upperLimit = (pct) + offset

            guard x >= lowerLimit && x < upperLimit else { return 0 }
            
            let angle = ((x - pct - offset) * m)*360-90
            
            return (sin(angle.rad) + 1) / 2
        }
    }
}

// MARK: - Example 13
struct Example13: View {
    @State private var flag = false
    @State private var number: Double = 21

    var body: some View {
        VStack {
            Color.clear
            
            Slider(value: $number, in: 0...99)
            Text("Number = \(number)")

            HStack(spacing: 10) {
                MyButton(label: "17", font: .headline) {
                    withAnimation(Animation.interpolatingSpring(mass: 0.1, stiffness: 1, damping: 0.4, initialVelocity: 0.8)) {
                        self.number = 17
                    }
                }

                MyButton(label: "87", font: .headline) {
                    withAnimation(Animation.interpolatingSpring(mass: 0.1, stiffness: 1, damping: 0.4, initialVelocity: 0.8)) {
                        self.number = 23
                    }
                }

                MyButton(label: "87", font: .headline) {
                    withAnimation(Animation.interpolatingSpring(mass: 0.1, stiffness: 1, damping: 0.4, initialVelocity: 0.8)) {
                        self.number = 87
                    }
                }
            }

        }
        .overlay(MovingCounter(number: number))
        .navigationBarTitle("Exampler 13")
        
    }
}

struct MovingCounter: View {
    let number: Double
    
    var body: some View {
        Text("00")
            .modifier(MovingCounterModifier(number: number))
    }
    
    struct MovingCounterModifier: AnimatableModifier {
        @State private var height: CGFloat = 0

        var number: Double
        
        var animatableData: Double {
            get { number }
            set { number = newValue }
        }
        
        func body(content: Content) -> some View {
            let n = self.number + 1
            
            let tOffset: CGFloat = getOffsetForTensDigit(n)
            let uOffset: CGFloat = getOffsetForUnitDigit(n)

            let u = [n - 2, n - 1, n + 0, n + 1, n + 2].map { getUnitDigit($0) }
            let x = getTensDigit(n)
            var t = [abs(x - 2), abs(x - 1), abs(x + 0), abs(x + 1), abs(x + 2)]
            t = t.map { getUnitDigit(Double($0)) }
            
            let font = Font.custom("Menlo", size: 34).bold()
            
            return HStack(alignment: .top, spacing: 0) {
                VStack {
                    Text("\(t[0])").font(font)
                    Text("\(t[1])").font(font)
                    Text("\(t[2])").font(font)
                    Text("\(t[3])").font(font)
                    Text("\(t[4])").font(font)
                }.foregroundColor(.green).modifier(ShiftEffect(pct: tOffset))
                
                VStack {
                    Text("\(u[0])").font(font)
                    Text("\(u[1])").font(font)
                    Text("\(u[2])").font(font)
                    Text("\(u[3])").font(font)
                    Text("\(u[4])").font(font)
                }.foregroundColor(.green).modifier(ShiftEffect(pct: uOffset))
            }
            .clipShape(ClipShape())
            .overlay(CounterBorder(height: $height))
            .background(CounterBackground(height: $height))
        }
        
        func getUnitDigit(_ number: Double) -> Int {
            return abs(Int(number) - ((Int(number) / 10) * 10))
        }
        
        func getTensDigit(_ number: Double) -> Int {
            return abs(Int(number) / 10)
        }
        
        func getOffsetForUnitDigit(_ number: Double) -> CGFloat {
            return 1 - CGFloat(number - Double(Int(number)))
        }
        
        func getOffsetForTensDigit(_ number: Double) -> CGFloat {
            if getUnitDigit(number) == 0 {
                return 1 - CGFloat(number - Double(Int(number)))
            } else {
                return 0
            }
        }

    }
    
    struct CounterBorder: View  {
        @Binding var height: CGFloat
        
        var body: some View {
            GeometryReader { proxy in
                RoundedRectangle(cornerRadius: 5.0).stroke(lineWidth: 5).foregroundColor(Color.blue).frame(width: 80, height: proxy.size.height / 5.0 + 30)
            }
        }
    }
    
    struct CounterBackground: View {
        @Binding var height: CGFloat
        
        var body: some View {
            GeometryReader { proxy in
                RoundedRectangle(cornerRadius: 5.0).fill(Color.black).frame(width: 80, height: proxy.size.height / 5.0 + 30)
            }
        }
    }
    
    struct ClipShape: Shape {
        func path(in rect: CGRect) -> Path {
            let r = rect
            let h = (r.height / 5.0 + 30.0)
            var p = Path()
            
            let cr = CGRect(x: 0, y: (r.height - h) / 2.0, width: r.width, height: h)
            p.addRoundedRect(in: cr, cornerSize: CGSize(width: 5.0, height: 5.0))
            
            return p
        }
    }
    
    struct ShiftEffect: GeometryEffect {
        var pct: CGFloat = 1.0
        
        func effectValue(size: CGSize) -> ProjectionTransform {
            return .init(.init(translationX: 0, y: (size.height / 5.0) * pct))
        }
    }
}

// MARK: - Example 14
struct Example14: View {
    @State private var flag = false
    
    var body: some View {
        VStack {
            Spacer()
            AnimatableColorText(from: UIColor.systemRed, to: UIColor.systemGreen, pct: flag ? 1 : 0) {
                Text("Hola!").font(.largeTitle)
            }
            Spacer()
            Button("Toggle Color") {
                withAnimation(.easeInOut(duration: 2.0)) {
                    self.flag.toggle()
                }
            }
            Spacer()
        }.navigationBarTitle("Example 14")
    }
}

struct AnimatableColorText: View {
    let from: UIColor
    let to: UIColor
    let pct: CGFloat
    let text: () -> Text
    
    var body: some View {
        let textView = text()
        
        return textView.foregroundColor(Color.clear)
            .overlay(Color.clear.modifier(AnimatableColorTextModifier(from: from, to: to, pct: pct, text: textView)))
    }
    
    struct AnimatableColorTextModifier: AnimatableModifier {
        let from: UIColor
        let to: UIColor
        var pct: CGFloat
        let text: Text
        
        var animatableData: CGFloat {
            get { pct }
            set { pct = newValue }
        }

        func body(content: Content) -> some View {
            return text.foregroundColor(colorMixer(c1: from, c2: to, pct: pct))
        }
        
        // This is a very basic implementation of a color interpolation
        // between two values.
        func colorMixer(c1: UIColor, c2: UIColor, pct: CGFloat) -> Color {
            guard let cc1 = c1.cgColor.components else { return Color(c1) }
            guard let cc2 = c2.cgColor.components else { return Color(c1) }
            
            let r = (cc1[0] + (cc2[0] - cc1[0]) * pct)
            let g = (cc1[1] + (cc2[1] - cc1[1]) * pct)
            let b = (cc1[2] + (cc2[2] - cc1[2]) * pct)

            return Color(red: Double(r), green: Double(g), blue: Double(b))
        }

    }
}
