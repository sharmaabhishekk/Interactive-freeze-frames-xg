# Freeze Frames xG Interactive App

This site is meant as a demo to go along with this blog post [xG with CNNs]("https://www.opengoalapp.com/xg-with-cnns-full-study"). The Expected Goals (xG) model developed there is a CNN-based model trained on Statsbomb's freeze frames dataset. The features it takes into account are:

* shot location
* location of the goalkeeper
* location of the defenders

## Model details

To learn more about the model, it is strongly suggested you read the full write-up linked above. The important part is the model architecture and the inputs.
For each shot scenario, the model takes into account three things - the location of the ball, the location of defenders, and the location of the goalkeeper, and merges them to form a single input.

![Model Inputs]("./public/images/model-input.webp")

The model itself has 3 [Convolution + Max-pooling] layers, followed by a single dense layer to flatten out the outputs from the convolution layer. Finally, we predict a single value which is the the probability of the shot resulting in a goal (AKA, the xG value).

![Model Architecture]("./public/images/final_arch.webp")
