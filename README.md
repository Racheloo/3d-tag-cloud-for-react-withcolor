# 3d-tag-cloud-for-react-withcolor
原作者地址：https://github.com/crazylxr/3d-tag-cloud-for-react 

作者jyoketsu在原作者基础上 将标签参数改为了对象数组并添加了点击事件：https://github.com/jyoketsu/3d-tag-cloud-for-react-withclick

我在3d-tag-cloud-for-react-withclick的基础上添加了颜色自定义功能。

感谢 [crazylxr](https://github.com/crazylxr) 感谢 [jyoketsu](https://github.com/jyoletsu )



### 安装

```
npm install react3dtagcloud_withclor --save
```



### 使用

```
import React from "react";
import TagCloud from "react3dtagcloud";

class Demo extends React.Component {
  handleClick(tag) {
    alert(`id:${tag.id};name:${tag.name}`);
  }

  render() {
    let tagName = [
      { id: "java", name: "java" },
      { id: "javscript", name: "javscript" },
      { id: "C", name: "C" },
      { id: "C++", name: "C++" },
      { id: "fe", name: "前端" },
      { id: "React", name: "React" },
      { id: "Vue", name: "Vue" },
      { id: "redux", name: "redux" },
      { id: "writing", name: "写作" },
      { id: "programmer", name: "程序员" },
      { id: "programme", name: "编程" }
    ];
    tagName = [...tagName, ...tagName, ...tagName];

    return (
      <div
        style={{
          width: "300px",
          height: "300px",
          padding: "100px"
        }}
      >
        <TagCloud
          tagName={tagName}
          radius={200}
          onClick={this.handleClick}
          colors=['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55']
        />
      </div>
    );
  }
}
```

### API

 对于标签云可以设置一些自定义属性，具体如下： 

| 属性    | 说明         | 类型          | 默认值 |
| ------- | ------------ | ------------- | ------ |
| tagName | 标签数组     | Array<string> | []     |
| speed   | 球体旋转速度 | number        | 10     |
| radius  | 球的半径     | number        | 200    |
| url     | 前缀 url     | string        | ''     |
| colors  | 颜色集       | Array<string> | []     |

