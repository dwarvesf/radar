# SSH
## Preface
Have you ever seen this before ?
![image](https://user-images.githubusercontent.com/37581250/75219208-be8ccf00-57ce-11ea-9ff4-e5c96262c056.png)
Every time you try to clone a github repo, this message box pop up and provide you all the information needed to *clone with SSH*. But what 's SSH ? That's exactly what this article gonna show you today.

## What is SSH ?
SSH, Secure Shell or Secure Socket Shell, is a network protocol that provide us a secure channel to operate services over unsecured network. It's typically used in authenticate to send remote command, login or grant permission, ...

Whenever data is sent by a computer to the network with SSH integrated, SSH automatically encrypts it. When the data reaches its intended recipient, SSH automatically decrypts (unscrambles) it. The result is transparent encryption: users can work normally while their communications are safely encrypted on the network.

##  What can SSH do ?
SSH is a low-cost, software-based solution for network data security. It doesn't solve every privacy and security problem, but it eliminates several of them effectively. Its major features are: 
- A secure, client/server protocol for encrypting and transmitting data over a network
- Authentication or optional integration with other popular authentication systems, including Kerberos, SecurID, PGP, TIS Gauntlet, and PAM
- The ability to add security to insecure network applications such as Telnet, FTP, and many other TCP/IP-based programs and protocols
- Almost complete transparency to the end user
- Implementations for most operating systems 

## Architecture
The SSH-2 protocol has an internal architecture (defined in RFC 4251) with well-separated layers, namely:
- **The transport layer** (RFC 4253), which typically runs on top of TCP/IP. This layer handles initial key exchange as well as server authentication, and sets up encryption, compression and integrity verification.
- **The user authentication layer** (RFC 4252). This layer handles client authentication and provides a number of authentication methods:
  - *password*: a method for straightforward password authentication, including a facility allowing a password to be changed. Not all programs implement this method.
  - *publickey*: a method for public key-based authentication, usually supporting at least DSA, ECDSA or RSA keypairs, with other implementations also supporting X.509 certificates.
  - *keyboard-interactive* (RFC 4256): a versatile method where the server sends one or more prompts to enter information and the client displays them and sends back responses keyed-in by the user. Used to provide one-time password authentication such as S/Key or SecurID.
  - *GSSAPI* authentication methods which provide an extensible scheme to perform SSH authentication using external mechanisms such as Kerberos 5 or NTLM, providing single sign-on capability to SSH sessions.
- **The connection layer** (RFC 4254). This layer defines the concept of channels, channel requests and global requests using which SSH services are provided. A single SSH connection can host multiple channels simultaneously, each transferring data in both directions. Channel requests are used to relay out-of-band channel-specific data, such as the changed size of a terminal window or the exit code of a server-side process. Additionally, each channel performs its own flow control using the receive window size. The SSH client requests a server-side port to be forwarded using a global request. Standard channel types include:
  - *shell* for terminal shells, SFTP and exec requests (including SCP transfers)
  - *direct-tcpip* for client-to-server forwarded connections
  - *forwarded-tcpip* for server-to-client forwarded connections
- **The SSHFP DNS record** (RFC 4255) provides the public host key fingerprints in order to aid in verifying the authenticity of the host.

## How does SSH work ?
You probably already have a basic understanding of how SSH works. The SSH protocol employs a client-server model to authenticate two parties and encrypt the data between them.

The SSH connection between the client and the server happens in three stages:
#### VERIFY SERVER
- A connection is always initiated by the client to the server. So the first step is to establish a TCP connection to port 22 on the server. Let's see what's in there.

![image](https://user-images.githubusercontent.com/37581250/75262213-c4aa9c00-581e-11ea-8d44-1959b30dd185.png)

- There's 2 valuable information that client should care: the protocol version supported by the server and ssh server package version. if client couldn't support 2 of those version, the connection will be broken.
- If the client is communicating with the server for the first time. The client will get a warning on his screen which will be something like the below.

![image](https://user-images.githubusercontent.com/37581250/75264097-7945bd00-5821-11ea-82b4-9d28e615f5f8.png)

- If the connection process is succeed, server identity will be stored as `server_host_key`(ecdsa key as you can see above) in `known_host` file so that the next time this client connect, there would be no warning.
- Now, the server and client will negotiate a session key using Diffie-Hellman algorithm. This session key will be use to encrypt and decrypt all message in this session between client, server communication.

#### AUTHENTICATE CLIENT
As mention before in the Architecture section, there are multiple methods to authenticate client. But in this article we will only approach the strongest of them, public key authentication. 

For this authentication to work, client first must provide server their credential so that the server can authenticate client identity. Client need to generate a pair of RSA key, `public key` for encryption and `private key` for decryption.

![image](https://user-images.githubusercontent.com/37581250/75266011-549f1480-5824-11ea-9e1a-c06a11c06635.png)

Then manually give it to the server client intend to connect. The server will keep this public key inside its list of authorized hosts. Now the client authentication process can begin.
1. The client begins by sending an ID for the key pair it would like to authenticate with to the server.
2. The server check’s the authorized_keys file of the account that the client is attempting to log into for the key ID.
3. If a public key with matching ID is found in the file, the server generates a random number and uses the public key to encrypt the number.
4. The server sends the client this encrypted message.
5. If the client actually has the associated private key, it will be able to decrypt the message using that key, revealing the original number.
6. The client combines the decrypted number with the shared session key that is being used to encrypt the communication, and calculates the MD5 hash of this value.
7. The client then sends this MD5 hash back to the server as an answer to the encrypted number message.
8. The server uses the same shared session key and the original number that it sent to the client to calculate the MD5 value on its own. It compares its own calculation to the one that the client sent back. If these two values match, it proves that the client was in possession of the private key and the client is authenticated.

Now the client and server can communicate to each other through ssh channel.

## Conclusion
The main idea behind this article is to help the readers to understand what is ssh and what happens when the user tries to login into a remote server.

## References
SSH The Secure Shell - Daniel J Barrett Richard Silverman
https://en.wikipedia.org/wiki/Secure_Shell
https://www.slashroot.in/secure-shell-how-does-ssh-work
https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process
