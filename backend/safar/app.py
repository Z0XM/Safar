import streamlit as st
from tensorflow.keras import models,utils
import numpy as np

st.header("Vehicle Check")
img = st.file_uploader("Upload the vehicle Image")
if img:
    model = models.load_model("model_classifer.h5")
    img = utils.load_img(img,target_size = (224,224,3))
    x = utils.img_to_array(img)
    x = np.expand_dims(x,axis=0)

    target = model.predict(x)
    target = np.argmax(target)
    
    if target: 
        st.markdown("#### The vehicle is in good state")
        st.markdown("<span style='color:green'>Regular check up done</span>", unsafe_allow_html=True)
    else:
        st.markdown("#### The vehicle is in pretty bad state.")
        st.markdown("<span style='color:red'>Needs to be inspected</span>", unsafe_allow_html=True)
        
    st.image(img)