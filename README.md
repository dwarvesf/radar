# Dwarves Tech Radar

A place where the Dwarves note down their research and development pieces of technology.

## Submit your topic

We start working a new volume every 2 months. Please prepare your topic and submit before starting every new cycle. The topic submission should follow the [submission template](_template_submission.md) to be able to describe your topic at its best.
 
## Submit the output

We named the output RFC, which stands for Request for Comments. It's a well-known collaboration practice among the programmers. We found it suitable in our case to conduct the tech radar.

When you're done with your study, fork this repo and submit your work as a new Pull Request.

RFC is required among the study. It's like the abstract when you do whitepaper. You can follow the [RFC template](_template_rfc.md) or use these as references:

- https://github.com/apple/swift-evolution/tree/master/proposals
- https://github.com/golang/proposal/tree/master/design

Your directory should follow this structure:

```
topic
│   rfc.md
│   README.md
└───src/
│   │   README.md
│   │   main.go
│   │
│   └───pkg
│       │   google.go
│       │   ...
│
└───docs/
│    │   slide.md
│    │   document.md
│
└───examples/
     │   example1.md
     │   example2.md
     │   tutorial.mp4
```

## Resources

- RFC template: https://github.com/dwarvesf/radar/_template_rfc.md
- Topic template: https://github.com/dwarvesf/radar/_template_submission.md

## Contributing

We love pull requests. If you have something you want to add or remove, please open a new pull request. Please leave all PRs open for at least a week to get feedback from everyone.

## License

Creative Commons Attribution 4.0 International (CC BY 4.0)
@ [Dwarves Foundation](https://d.foundation)
