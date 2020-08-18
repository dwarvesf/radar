package debug

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/mkhoi1998/mimir/consts"
)

// Handler simply let user describe their code for rubber duck debugging (or in this case, Mimir debugging)
func Handler(args []string) error {
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("<(.)__\n (___/")
	fmt.Println(consts.DebugHelp)
	fmt.Printf("\033[1;36m%s\033[0m\n", consts.DebugGreet())

	for {
		cmdString, err := reader.ReadString('\n')
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
		err = runCommand(cmdString)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
	}
}

func runCommand(commandStr string) error {
	commandStr = strings.TrimSuffix(commandStr, "\n")
	arrCommandStr := strings.Fields(commandStr)
	if len(arrCommandStr) == 0 {
		return nil
	}
	switch arrCommandStr[0] {
	case ":q":
		fmt.Printf("\033[1;36m%s\033[0m\n", consts.Bye())
		time.Sleep(time.Second)
		os.Exit(0)
	case ":h":
		fmt.Println(consts.DebugHelp)
	default:
		rand.Seed(time.Now().Unix())
		r := rand.Intn(10)
		if r == 1 {
			fmt.Println(consts.DebugChat())
		}
	}
	return nil
}
