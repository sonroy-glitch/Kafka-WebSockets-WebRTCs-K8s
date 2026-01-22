import { useEffect, useState } from "react";

export const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [pc, setPC] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/?userId=abcd');
        socket.onopen = () => console.log("WebSocket connected");
        setSocket(socket);

        // Cleanup on unmount
        return () => {
            socket.close();
        };
    }, []);

    // Modified to check if both socket and pc are initialized
    const initiateConn = async () => {
      const pc = new RTCPeerConnection();
      setPC(pc)
        if (!socket) {
            console.log("WebSocket not initialized");
            return;
        }
        
        if (!pc) {
            console.log("PeerConnection not initialized");
            return;
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createAnswer') {
                await pc.setRemoteDescription(message.sdp);
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        };

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.send(JSON.stringify({
                type: 'createOffer',
                sdp: pc.localDescription
            }));
        };

        getCameraStreamAndSend(pc);
    };

    const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();
                // Optionally, add the video to the DOM for visibility
                document.body.appendChild(video);
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                });
            })
            .catch((err) => console.error('Error accessing webcam:', err));
    };

    return (
        <div>
            <p>Sender</p>
            <button onClick={initiateConn}>Send data</button>
        </div>
    );
};
