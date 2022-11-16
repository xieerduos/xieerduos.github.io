# Mermaid 图表绘制工具

Github Mermaid 仓库地址 https://github.com/mermaid-js/mermaid

Github Mermaid 中文文档 https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md

Github Pages https://mermaid-js.github.io

## Mermaid 是什么？

Mermaid 是一个基于 Javascript 的图表绘制工具，通过解析类 Markdown 的文本语法来实现图表的创建和动态修改。

Mermaid 诞生的主要目的是让文档的更新能够及时跟上开发进度。

## Mermaid 语法

### 流程图

```Mermaid
flowchart LR
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

### 时序图

```Mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

## VSCode Markdown 预览插件

VSCode 插件 -> 输入关键字 -> Markdown preview

```Mermaid
flowchart LR
A[VSCode插件]
-->|输入关键字 Markdown preview|B[Markdown Preview Enhanced]
-->|安装| C(出现预览图标)
-->|点击图标| D(查看效果)
```
