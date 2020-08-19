package cmd

import (
	"github.com/spf13/cobra"

	"github.com/mkhoi1998/mimir/cmd/answer"
	"github.com/mkhoi1998/mimir/cmd/debug"
)

var rootCmd = &cobra.Command{
	Use:                   "mimir",
	Long:                  `A command-line assistant for developers`,
	Args:                  cobra.MinimumNArgs(0),
	DisableFlagsInUseLine: true,
	Run: func(cmd *cobra.Command, args []string) {
		answer.Handler(args)
	},
}

var chatCmd = &cobra.Command{
	Use:                   "debug",
	Long:                  `Let me debug your code.`,
	Args:                  cobra.MinimumNArgs(0),
	DisableFlagsInUseLine: true,
	RunE: func(cmd *cobra.Command, args []string) error {
		return debug.Handler(args)
	},
}

func init() {
	rootCmd.AddCommand(chatCmd)
}

// Execute the commands
func Execute() {
	rootCmd.Execute()
}
