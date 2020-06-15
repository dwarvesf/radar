# XPC service in macOS

| Status        | Assess                                                |
| :------------ | :-------------------------------------------------------------------------------------------- |
| **Author(s)** | Phuc Le (phucld@dwarvesv.com)                                          |
| **Type** | Technique                                          |

## Objective

Know about the XPC services, what is it, how to use it and when should we use it.

## Motivation

When I scattered around the Applications folder, I found out that many apps have something called `Helper`. These `Helper` is a small app, attached in the main application bundle, and run along with the main app. When the first time I saw it, I wondered what it is and why they're using it.

After a while searching, I knowed that these little `Helper` is a kind of background process, which helps the main application to do some tasks. But it's not all about this, so I started this RFC to dig deep into this topic.

## Benefit

There are many benifit when using a background process, such as XPC service.

- A service is separated into a module, so we can reuse it
- Low memory footprint
- More reliable app
- Make the app more secure

## Code & Documents/Slides

- [Code](/Code)
- [Documents/Slides](/Documents)

