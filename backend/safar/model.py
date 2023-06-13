from tensorflow.keras import layers,models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

base_dir = "car_damage"
train_dir = os.path.join(base_dir, 'training')
validation_dir = os.path.join(base_dir, 'validation')

train_datagen = ImageDataGenerator(rescale=1./255)
test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
        train_dir,  
        target_size=(224, 224), 
        batch_size=20,
        class_mode='binary')

validation_generator = test_datagen.flow_from_directory(
        validation_dir,
        target_size=(224, 224),
        batch_size=20,
        class_mode='binary')

model = models.Sequential()
model.add(layers.Conv2D(16,5,input_shape=(224,224,3),activation="relu"))
model.add(layers.Conv2D(16,5,activation="relu"))
model.add(layers.MaxPool2D())
model.add(layers.Flatten())
model.add(layers.Dense(64,activation="relu"))
model.add(layers.Dense(1,activation="softmax"))

model.compile(optimizer="adam",loss="binary_crossentropy",metrics=['acc'])
history = model.fit(train_generator,epochs=1)

model.save("model_classifer.h5")