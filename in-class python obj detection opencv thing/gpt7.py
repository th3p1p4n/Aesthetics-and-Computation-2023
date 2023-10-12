import cv2
import numpy as np

# Load the classifier files for face and eye detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")

# Load the webcam
cap = cv2.VideoCapture(0)

# Load the image for the filter
face_mask = cv2.imread("mask.png", cv2.IMREAD_UNCHANGED)

while True:
    # Capture a frame from the webcam
    ret, frame = cap.read()

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the grayscale frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    # Loop over each detected face
    for (x, y, w, h) in faces:
        # Extract the face ROI
        face_roi = frame[y:y+h, x:x+w]

        # Resize the face mask to match the size of the face ROI
        face_mask_resized = cv2.resize(face_mask, (w, h))

        # Create a mask for the face ROI and the face mask
        mask = face_mask_resized[:, :, 3]
        mask_inv = cv2.bitwise_not(mask)

        # Extract the foreground and background of the face ROI
        fg = cv2.bitwise_and(face_mask_resized[:, :, :3], face_mask_resized[:, :, :3], mask=mask)
        bg = cv2.bitwise_and(face_roi, face_roi, mask=mask_inv)

        # Add the foreground and background to get the final output
        output = cv2.add(fg, bg)

        # Replace the face ROI with the output
        frame[y:y+h, x:x+w] = output

        # Detect eyes in the face ROI
        eyes = eye_cascade.detectMultiScale(gray[y:y+h, x:x+w])

        # Loop over each detected eye
        for (ex, ey, ew, eh) in eyes:
            # Draw a green rectangle around the eyes
            cv2.rectangle(frame, (x+ex, y+ey), (x+ex+ew, y+ey+eh), (0, 255, 0), 2)

    # Display the frame
    cv2.imshow("Frame", frame)

    # Quit if the 'q' key is pressed
    if cv2.waitKey(1) == ord("q"):
        break

# Release the capture and close all windows
cap.release()
cv2.destroyAllWindows()
