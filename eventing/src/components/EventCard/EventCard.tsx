import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

export default function EventCard() {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEUAAAD////t7e3u7u7r6+vx8fH4+Pj19fXo6Ojk5OSvr6+ysrLMzMzR0dGdnZ22traEhISnp6d8fHwaGhrf399CQkKhoaHCwsLZ2dlOTk6KiooODg5iYmI2NjZtbW28vLwnJyeRkZE9PT1cXFx9fX0TExNycnI3NzdJSUkvLy9SUlIgICBnZ2eWlpZxoDoSAAARG0lEQVR4nO1dCXfqOA/Ngu0ECBAIS4EWWtq+rv//730JEAj4ykvWzjmfzpwZzXtZdENiXUuy7LiZeL7ve41ogvvJchePptuPf/vZZuM4zmYz2z9+bKe/8W6ZeFw0bIHT0PWZEC6P+uuHDJNSHib9SLhCsP8UQiGGi583HbaCvP0shqKZX7NuhH7632j0YQHuKvNRlJ7tN4MwlV51zRc8HGxLoctl2w+5yK2sxSonU08X7FXTfOZ68UsleCf5F3tu+lHWY5XnOTW9FIIHizrgneRlEXBW02dTE0K+O9QG7ySHXT0DTz0I2ahmeCf5ZbUgvH6SvVKa766eGsGXydPKZRXt85wKJx+14bwxfJnMhxXtq+oPl5+N4svkc9mZx2d82Dy+I8YhZx0gTPE1+34W5WVY3nmU5TQiqcZdbGWbiJKWluM0jD23ii+TZ8Za4zSM71rHl8mOt+TxRVg3fzGVQ2DPc8ogjK0te3yajOJlFAYsDIIgZEEYLePR5OnR+kpxCYS2nEY82Fg0fx6seDohFoyd7unld2dMZGGA1eDXakh+EMaWluI0Hh8Y2zKbjpP0gbA8OgGv56dAXTccv86Mrzvg9PWqcxpmSkF/4oRbXZknsem1n5jVla0QhmZPeh1lr6XtAJ2eE62Nrj8LmkI4Nrn9a2SDS9KiiclNxvYITfjBVH/nhwEzvx6hscGX/kbTBjhNoI9RrAPtVcy0nv5tnQem1zP1h4E2sruwGwA0Q9pCd7+N4cdo6vEjzf1mfSGq4ypogve/Nfc0++ANEWrGmM2Oi1pwFTXBd5qo+bguTuO5mkBTv/hhVwk4SFpffeORwX2NOI16AF8z0QS4oyaYesyZGFzFwB++qu5x8EVdryXUhK+cyLzqr6JH+K66Q8UokZG2VBnwXh2hCuB7g7iKmoprvFflNKqLLzXn1qepfsZpNU6jGGS29fAXQ00R95qoz1X7Q4Wb6Ju/ZLVoCscxUp2r9vi0o38L28FV0ELa/6umGkqENFX78tvCVeSq9JwjKsdpAvKCE8tAQj2ax+lRISjDaejZxLh1cLlGfjabgDyX9odkCGylf6Ea01aUUXPyXBIh6QhX7eMqaCTEqS1C6n2YhXVOdEsMN2Q0jBpQCU4TEpf57rGm+YtGY709YVtgwWk8RjyoPb85rhuNExBnzJzTcCI4+81tXqjGNE7EN55QEBp7fCJ0P+tVta0mrUe8YgNThAKf73Q8yBSHG8JCgRACTkNkl1asfRdPaIxwGg/yGYDTCCI/uPob4M4aATGWY0aSP6TegLH+5WlVIxx2IGWEJIQcR34mfwNXQcM0/MB1CBkuQviSB2LG2ptC+UyuAud4MrW7Hw7vOQ2Dp73lv/2VM4gkCU93b57J8NVw5fH7v2V4Snyf/brjNALXyYQytzj9xXwaB9c/a0QbvJ+9H7v/WzxiPAsVp2EJPEmOyRRf5rfnxGUNvaCDwqgwlorbcOwmuTnuzuNzGNLayncXt+PRSyxE3QgFH/7c3OTApeOwuZxGyIbwoSA7pIOevTqXS/hCxBL79OTjoL1DdoOwyGk4zPMuL+/0xZky9H5MuHRcac3/BTcYMOk4GCqec5LTwJ/wHZmAY/1rT3hWQLDGBI7TTsEZ0JAhyWlgQSx8jaAFqSzoVzX1aefCqEyhfSmjq5LQGei4T8rjw58cZpfoQONseG85O61n4slwOe6PB/1++s94OTz6t6zu5h5rRJdEBMAWwmiMEP2EB/ikVVnvrbhhHskyXr8Tcbv50zpeJrcIVamgHbIFscxPyGl8+BV6LmIZ6vrZOOU52S/XGz8blfl9PI8DwY9VVMpcobNGtvjoyOF1EUOB06AHvRaIb+jqE+eeG8aWVdKHeOUGmsLVLyHb4gmUCJ9fj7v6QzjjwlyF2xlfm2ykicORX6FDL2HrgsdH0ac+TtJ3hdCB5YACOecnGSF6Em8E86DCJI1LiJ0MmmSIC8L8g0UkYoddsq+rkGpMEkwo0Jz2173jNOjF+6aSaGTyoGlJiLQbCqDyW04Dp/Z9qgq2Q4Tws4Ff4o7d+EMUndmQE6K/htAXINeZR2xOCH1EwxYkws5Gmh6FcAEODvwCQoaO8MnICQ7mtCCCiucgi84Fr2dOA9juOv+cZR7RtT8EVgFi81LgNGDKfiTy1Eycm6+OqFW+Iac5augzO7rDk8dHgfwH6lrZa9/Rwqetog4ZUOVYXBCi6AXKVF0QInrQgvwqEIJp8wvPOQ1kYezynoMwQzer85ylIvuFxprQzzkNwD9RR1MaBwOFfOSZBvIYg4u3AFO5SB3uM1j0Ub/geEOuAbK8vSAEV9MENDUl5s3IQIkQozghBOjXGoSdeER66DtqwCVGZ4QgOhmhiEhBM1tkVrOssS25Bn6orPI0HUsF6AgklHkhSANbkBjFaa5WySd8iCOnAX/zpMyzCJzeaEGGqmoQAeIwIvP4KB0TqxD6veahUKKq6EHMbMhShOiVS1StxYj0civypUCIkp/pDNDxxI/05zOuSp104ilyGVNWpRqYEPyIjNPI8+Op4jIemoe0KD2ffvhyRuAt8xbAtalqZ7hylVDz8q5oHQHSKTxFCNyIYqkBVW/VnqzoVeJgBhGlCMFnpficiYKiFmVLT4MBceunCGVOfq4KR+zB7/wnTH9En7RPTi5NXAfkke4rUoqawZL1pmVKVuCAaqAv4XB5KB0oqmPagKATsnkkkye6G+6AwX9FI+zUF+ZC/gJoGPQdQAQ49Yw8eplJm/LBCftQ2i9xQF6ZXCGN6HsXEviEfeAjWjpyUOlRgJNPmn17oUaEpG5C7lq0c2Sjn+iamOY6JFoJuf4YcOzYkUOfExphG+abCIlQdu4jR3ZwI3Ka2VlG5l6otp+gzejUkSOJMdljRl3t0qIssX0uk7+5rSMHaZYUZ2ioEWsJGTGCc8m/wYcjjz5kMFh0PHG6ypSKssgTpUdnL/1ZSE4NOwxf3MqBQijPn/aOPPOnUsk+tWasfdlT02A5jThzZOLNyDhIG8YbyYYToQx5tN8AhKEHT/5D7pDMQnnyW4pWpAdk/W7zlpsK4Q9hTYks/0f4F8QGIfkdAs7QvOWmgu3D3yE1liJO04btZkJxGjSW2vjDNmw3E8rjI3+4l/6M5jQtmG4olMdHnEbmpSsSYUelULJ8UwhlXvqPnFsAziDq26KjorxQTfDQ3IKcHwKYnUf0c/nB9uH5IZjjk1GMPxDwPsmE8Idwjm8Tp/k7M2ACIYzT2MTazFtdNyxULxoYa5Pjpf/IXQg6q8G4lwjbh+OlVMwbcAYfr4PuQBKf4DTyoUuUtyBzO3/G5ctrnhV5C5vcE/8TiZlTasY89wTyh2MKIdGPoHVZE12Lcf4Q5IB/BZF76qo2+F76DNuHc8CgzPADnHzS/kAWPxOfsk/+itaWtRho9U0HQtonH9q3rKf5G1HvdwohUU9jUxMFPuUOpE8hJGqiQF3b6/E8FAcxi2U1LMG9Veq6NlSb+M3JehqrXWaakS8qjkTUJsL60pCsL/0Dr+nAsr4U1gj36Rrh5hHoBA8RihphyzrvzosVyBblVJ03VatPlal27vQTqriXqtV3qfUWVIqtY/b9QSXWyPUWruWaGdZxucKSHATB0q6VW2bdEy+3JXVNQk2cPOW6J7R2jQwLUx3PWpKI3K9TuXYNrj+EnOaodRhUfOWkVeAlPbJPgzWk9+zBgz1v2hGftIpeQ3oMb4Bw/Zjwh6kmOhtslvS6J3odcPYvxAZU62+4cuuZ5mSiKNNXr+WG6/F7NMKOQlIfisUkivX4p9ioqqcCcLC+10GibeYrFgQpeiqcPlO0ZJII95y0DlwGUz1ycHzeF+P4b8veJtkzaZ2fJqQtJr1NYH+aN+X2u21DTJTLR7X9aXAkdKDcDo/epaABmYWqXT9NegzBdQb7fHDGPIJ5rTHUuccIJnN6A5V9ovI8E2rmQVYLn7W2/OIracFJU/f6yvNM6EeckfT7rPFW2M1St/Guul/bJZOGwhMD3cZ4gjVOw6e+ZndM0557Nn0Tb6aLYaO10V8rekJ41nR9E68fLNX7knb75+8hagzj16rQEJ2q8tH1vryouBE0U4C7NOThUSP5jPeIG2w4oe1fWvjZzXvQSulll8f2W8Er5TPmgpzPFzX0AoEetMf/N+8jjOn9L+y0XEb2o9DoyXqWfYQtekFjrsqTRQ2f5JfVvuzoCqgX9OmthV/itFgLr9F8JtxoYdlftyg/i1XWHtrsbplG9fO+HnezNwKe2F57stPsphDFYUJwsYwnc7t88XwSD0OewrO6GywsmHNybwSLvvoGmhDJ0oicz5bniYNvfQ94vbu++jdXxXsj/JRD6InEcBnRt3JqpNCs90agor2aJluExiya8UalEJrtb3H9JI8VKbhfYKB3+xVLUwKbK5813Eb1rhpI2u8JrzgobtpmaILvaXZGvxNPEWbCa5x81T4z1+MM9wo6WHgoV/FJ03JQxkyAZrlXUGHKh4u515YI7ZNwO80k6V4ru9+Tx4iCkp0dQmqTQlreFAFtoFF7dskO5fT/Baag2nfNhGWcnpNqfwhC+uQacqDp9l0jOM1ZI2pmErqLby11N49UbbKsaffOozjNWaP6ewTmfrnUIrDQdNcou/0PEVMiyoK+ewZ3P2ml+tgsdFGhXKP2sEQZQYyQ2od0b4xQriQzkAeq78ydZrkP6S2nyQcK4iF93h5Hx27KADztrKZ39iZ7ySo4zVmjahD3PaOtOktmpkKDB6jcDxidYbun87fRcFNy6clSf2UWUmRQs6ez/DdkpFeV5cq1kg2zYv2V69uXu9re6iW7LS20Vy6/tzpgDwEZhdgRZ1y1kj3bn6nr5RrJlDZk3TDel/uk0RXPa47PyLWyjWwmcHepXPM4JtuZBDQLgv7wrNFz9IN6uCH2vtPKK7EW5jzI0JHKiLYFe/xco5fIzBR7QzSEkBxEz59NKYSqRaOq2E0TCBXD80j1tDGnuWr0m59F4CjnXPY7fKUzXYqIwYS0XsVp8r92VXlssH3nWSu5xm1CXU8VMHglmyCqOc1FU+V4SS9bBSG4nip3Rxa26z1+rinT2MMWECojPu8a600QKl/U1G+gSV19CIWvbHPwqrVewWk8k+HGyXryyrGRSggLFgim3oRhYmC9gtNcNc1WCGP3LsJS3lvcWaBh8COTyI7aH+aaJnI2W/KbXEEt/pDxnSZqDjdetfT4F02XZNmPhagVoRB9XeIq0n6CNggVM42zzBasRoT+Qpf12Ch5ozmnuWqBvvD52XPr4TQ9/SYv88DAZgNOc6MZ1Hd9jU8/ZJWxlI0Nqh2m5jkqmxS2UaR+HVVCGKld01momExJj1/4GM1Sgs+rknP8H7Mno566VULoss7XV6byZJf0N+E0BY2XyCnVLGN15XI5TlPURLeNaB+EsaVWnOZG67Ixe2xlqZXHL2hCtwV6Y3II6GbqdSL0UsbYCcCdbTGDHae50Rhrf5/OZ6ZcplQHp7nRRFKhArGEbBN6x4b6OM3dqzpsb4nefMhVa2Zq9Pg3WoqxtqJgpXwOuVE9dO0IM21Yc3U3wmdeh10Hp5G1ht/V+bCiffacRsozuavmyOrTymUV7SvDaWSt7JxeI7+iklUVPD7Q+K5u53HYWZdDNoowdR7Bor4v8mURlHcPtXAanHFyvbiOTsMvse8yYkenFjkN0jxf8HBc7XXdDkIu/HrAVeQ01EuR/nc1Krd89mOUxXhq+mzq8viEJsRw8WRT5/32sxgK+6lRdwiz5UHC5VF//aWLJG++Jv2Iu9laoHotuEV4fTPq1gT3k+UuHk23H//2s02Gd7OZ7R8/ttNRvFsmHhcNW/A/tlAhB7A5clsAAAAASUVORK5CYII=',
            }}
          />
          <Body>
            <Text>Discover Tirana</Text>
            <Text note>Taso Shyti</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{
            uri: `https://www.roughguides.com/wp-content/uploads/2015/05 
              /tirana-night-albania-shutterstock_1103465555-840x525.jpg`,
          }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="calendar" type="MaterialCommunityIcons" />

            <Text>May 12</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent style={{ justifyContent: 'flex-start' }}>
            <Icon active name="currency-eur" type="MaterialCommunityIcons" />
            <Text>10</Text>
          </Button>
        </Body>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>
    </Card>
  );
}
