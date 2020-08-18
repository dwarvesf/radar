.PHONY: build

.DEFAULT: help
help:
	@echo "make build-mac"
	@echo "       build devsup tool for mac"
	@echo "make build-linux"
	@echo "       build devsup tool for linux"
	@echo "make dep"
	@echo "       run to clean vendor"
	@echo "make clean"
	@echo "       run to clean source build"


clean:
	@rm -rf ./build
	
build-mac: clean
	env GOOS=darwin GOARCH=amd64 go build -o ./build/mimir main.go
	
build-linux: clean
	env GOOS=linux GOARCH=amd64 go build -o ./build/mimir main.go

dep:
	dep ensure