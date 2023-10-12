import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    
    for (x,y,w,h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]
        
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex,ey,ew,eh) in eyes:
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
        
        # apply Snapchat filter effect
        scale_factor = 1.5
        center = (int((x + x + w) / 2), int((y + y + h) / 2))
        radius = int(w / 2 * scale_factor)
        
        # calculate affine transformation matrix to make face bigger
        M = np.float32([[scale_factor, 0, center[0] - radius],
                        [0, scale_factor, center[1] - radius]])
        
        # apply affine transformation to face region
        warped = cv2.warpAffine(roi_color, M, (int(w*scale_factor), int(h*scale_factor)))
        
        # resize warped image to the size of the original face region
        warped = cv2.resize(warped, (w, h))
        
        # replace original face region with transformed face region
        frame[y:y+h, x:x+w] = warped
        
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
