package consts

import (
	"fmt"
	"math/rand"
	"time"
)

const (
	StackOverflowWikiBodyFilter   = "!--fGggaXKPAj"
	StackOverflowAnswerBodyFilter = "!-*jbN.9m(dML"
	StackOverflowKey              = "U4DMV*8nvpm3EOpvf69Rxw(("

	DebugHelp = "\033[1;36mJust try to explain your code to me or tell me what to do\n:h\033[0m\tI will show you how to speak to me.\n\033[1;36m:q\033[0m\tGood bye.\n"
)

var (
	// Greetings store lines for greeting
	Greetings = []string{
		"Hello world!",
		"Hello world! How can I help you?",
		"Hello world! What can I do for you today?",
		"What can I do for you today?",
		"You can ask me anything.",
		"How can I help you?",
		"How is your code?",
		"How is your code doing?",
		"Hello world! How can I help you, brother?",
		"Hello world! What can I do for you today, brother?",
		"What can I do for you today, brother?",
		"You can ask me anything, brother?",
		"How can I help you, brother?",
		"How is your code, brother?",
		"How is your code doing, brother?",
		"Well, brother, I've been to many strange places, but this will be a new one.",
		"I'm dangling from the hip of the bloody Ghost of Sparta!",
		"Yes, lad?",
		"Yes...",
		"You look well",
		"Nice to see you again too, Sindri.",
		"But today the winds of fate have kicked up a strange vortex of coincidence.",
		"Yoooooooor-moooooooooo hin meeee-meeeeeeeer.",
		"Ready.",
	}

	// Helps store lines for providing helps
	Helps = []string{
		"Hope this helps!",
		"It's your best and only move from a tactical standpoint.",
		"And she'll help? She might do. Worth a try.",
		"Wouldn't you agree, brother?",
		"Precisely.",
		"Luckily, I know where it is and It's not fair.",
		"Just some sage advice...",
		"We really should expect that sort of response at this point.",
		"It'll serve.",
		"Well... let's look at what we know",
		"A loving gift.",
	}

	// Errs store lines for response errors
	Errs = []string{
		"My mind is not responding...",
		"You may want to Google it or Stackoverflow it yourself",
		"Baldur is blessed with invulnerability to all threats, physical or magical.",
		"Okay there are a few gaps in my knowledge.",
		"I'm a clever, lad. I can piece it together, I promise. Just... given time.",
		"Oh then you've come to the wrong place, little brother.",
		"Parts of m'brain must still be coming back to life.",
		"Well, as I recalled... it involved... eh...",
		"Just need a moment to finish waking up.",
		"You'll forgive me- I've never spoken the Ancient Tongue sober.",
		"Its not like I can still see through it.",
		"Well, we'll circle back to that later.",
		"When dit I stop making sense?",
		"Fate's a tricky thing, lad.",
		"Lad, there comes a time in every man's life when he changes his code and head north to make a new start.",
		"blah-de-blah-de-blah-de-blah.",
		"Mimir of the Bifrost teats!",
	}

	// DebugGreetings store lines for greeting in debug mode
	DebugGreetings = []string{
		"Go on, I'm listening.",
		"Can you tell me what you are doing?",
		"How is your code?",
		"How is your code doing?",
		"Can you tell me your code?",
		"Go on, I'm listening, brother.",
		"Can you tell me what you are doing, brother?",
		"How is your code, brother?",
		"How is your code doing, brother?",
		"Can you tell me your code, brother?",
		"Fact is, there's only one person alive who can get you where you need to go... and luckily for you, my schedule's wide open.",
		"All right, wish me luck!",
		"Explain your code, please.",
	}

	// DebugMid store lines for mid-conversation in debug mode
	DebugMid = []string{
		"Oh... hadn't considered that. Maybe we should talk about this a bit more.",
		"That's it precisely.",
		"Indeed",
		"It's true",
		"Precisely.",
		"Correct.",
		"Couldn't agree more, brother.",
		"Well, you gentlement certainly know how to get around.",
		"Hm. That's quite interesting.",
		"Well... let's look at what we know",
		"Oh, I quite agree.",
		"On that, brother, you and the Allfather may just agree.",
		"Rather overdid it with that one, methinks.",
		"And I saw fit to move on",
		"I beg you a pardon?",
		"Yeah I got that.",
		"Imagine that...",
		"How's that, brother?",
		"Very well my brother",
	}

	// Byes store lines for farewell response
	Byes = []string{
		"I'll see you later.",
		"Happy coding",
		"Fair enough.",
		"Very well",
		"Efni... ooooooo-foooooon-gooooor.",
		"Aye lad.",
		"Well, you gentlement certainly know how to get around.",
		"Very well my brother",
	}
)

// Greet return lines from Greetings randomly
func Greet() string {
	rand.Seed(time.Now().Unix())
	t := []string{"Happy ", "Good ", "", "", ""}
	r := t[rand.Intn(len(t))]
	if r != "" {
		p := ""
		switch h := time.Now().Hour(); {
		case h < 12:
			p = "Morning"
		case h < 18:
			p = "Afternoon"
		case h < 22:
			p = "Evening"
		}
		d := []string{time.Now().Weekday().String(), p}
		r = fmt.Sprintf("%v%v. ", r, d[rand.Intn(len(d))])
	}
	e := []string{" :)", " =)", " :)))))", " =))))))", "", "", "", "", "", ""}
	return fmt.Sprintf("%v%v%v", r, Greetings[rand.Intn(len(Greetings))], e[rand.Intn(len(e))])
}

// Error return lines from Errs randomly
func Error() string {
	rand.Seed(time.Now().Unix())
	return Errs[rand.Intn(len(Errs))]
}

// DebugGreet return lines from DebugGreetings randomly
func DebugGreet() string {
	rand.Seed(time.Now().Unix())
	t := []string{"Happy ", "Good ", "", "", ""}
	r := t[rand.Intn(len(t))]
	if r != "" {
		p := ""
		switch h := time.Now().Hour(); {
		case h < 12:
			p = "Morning"
		case h < 18:
			p = "Afternoon"
		case h < 22:
			p = "Evening"
		}
		d := []string{time.Now().Weekday().String(), p}
		r = fmt.Sprintf("%v%v. ", r, d[rand.Intn(len(d))])
	}
	e := []string{" :)", " =)", " :)))))", " =))))))", "", "", "", "", "", ""}
	return fmt.Sprintf("%v%v%v", r, Greetings[rand.Intn(len(Greetings))], e[rand.Intn(len(e))])
}

// DebugChat return lines from DebugMid randomly
func DebugChat() string {
	rand.Seed(time.Now().Unix())
	return DebugMid[rand.Intn(len(DebugMid))]
}

// Bye return lines from Byes randomly
func Bye() string {
	rand.Seed(time.Now().Unix())
	e := []string{" :)", " =)", " :)))))", " =))))))", "", "", "", "", "", ""}
	return fmt.Sprintf("%v%v", Byes[rand.Intn(len(Byes))], e[rand.Intn(len(e))])
}

// ParseLink return link with lines from Helps randomly
func ParseLink(link string) string {
	rand.Seed(time.Now().Unix())
	return fmt.Sprintf("%v\n\033[0;36m%v\033[0m", link, Helps[rand.Intn(len(Helps))])
}
