## Mono-repo-utils

# Contains various shell scripts for automating mono-repo stuff

## Running Tests

To run the tests for the shell scripts, you can use [Bats](https://github.com/bats-core/bats-core), a Bash automated testing system.

### Prerequisites

Make sure you have Bats installed. You can install it using the following commands:

```sh
# Clone the Bats repository
git clone https://github.com/bats-core/bats-core.git

# Change to the Bats directory
cd bats-core

# Run the install script
sudo ./install.sh /usr/local

# Once installed run tests using
```bash
bats mono-repo-utils/__tests__/test-create-package.bats
```