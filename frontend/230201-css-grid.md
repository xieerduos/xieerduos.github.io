# CSS Grid 布局指南

https://www.runoob.com/css3/css-grid.html

## I. CSS Grid 布局简介

### - CSS Grid 布局是什么？

CSS Grid Layout 是一种二维布局技术，可以通过行和列的网格系统来定位元素。它是 CSS3 的一部分，提供了一种更灵活和强大的方法来实现页面布局，以前可能只能通过使用布局技巧，例如浮动和定位，来实现。它允许您在 CSS 代码中更直观地指定元素的位置，大小和对齐方式。

### - 使用 CSS Grid 布局的优点

- 灵活性：您可以使用 CSS Grid 布局创建任何形状和复杂的页面布局，并且可以很容易地改变元素的大小和位置。
- 响应式设计：CSS Grid 布局支持响应式设计，您可以使用 media 查询来适应不同的屏幕大小和设备。
- 减少代码量：使用 CSS Grid 布局可以使您的代码更简洁，更直观，并且更易于维护。
- 兼容性：CSS Grid 布局是 CSS3 的一部分，已经被广泛支持，并且在主流浏览器中都有很好的兼容性。
- 可读性：CSS Grid 布局的语法简洁易懂，并且直观地表示了元素的布局。

总的来说，CSS Grid 布局是一种灵活，强大和高效的页面布局技术，极大地提高了布局的效率和可读性。

### - 浏览器支持情况

https://caniuse.com/css-grid

95.32% + 0.6% = 95.91%

## II. CSS Grid 布局基本概念

## - Grid 容器和 Grid 项

CSS Grid 布局中的 Grid 容器是一个 HTML 元素，其内部包含多个 Grid 项。

Grid 容器是用于定义 Grid 布局的元素，可以是任何 HTML 元素，如 div，section，article 等。在 Grid 容器中，您可以使用 CSS 属性来定义网格的行和列，并定义网格的大小，对齐方式和其他布局选项。

Grid 项是 Grid 容器中的子元素，您可以使用 CSS 属性定义每个 Grid 项在网格中的位置，大小和对齐方式。 Grid 项可以是任何 HTML 元素，如 div，p，img 等。

通过在 Grid 容器上定义网格和在 Grid 项上定义每个项目的位置，您可以使用 CSS Grid 布局创建灵活，简洁且容易维护的页面布局。

- Grid 线
- Grid 轨道（行和列）
- Grid 单元格
- Grid 区域

## III. 设置 Grid 容器

- 使用 display: grid 创建 Grid 容器
- 使用 grid-template-rows 和 grid-template-columns 定义行和列
  grid-template-rows 和 grid-template-columns 是 CSS Grid 布局中用于定义网格行和列的属性。

使用 grid-template-rows 属性可以定义网格的行高，可以使用固定值（如 px）或百分比。例如：

```css
.grid-container {
  display: grid;
  grid-template-rows: 50px 100px 150px;
}
```

使用 grid-template-columns 属性可以定义网格的列宽，同样可以使用固定值或百分比。例如：

```css
.grid-container {
  display: grid;
  grid-template-columns: 25% 50% 25%;
}
```

通过使用这些属性，您可以精确地控制网格的大小和外观，以满足您的布局需求。

- 使用 grid-row-gap 和 grid-column-gap 指定 Grid 间隙

## IV. 放置 Grid 项

- 使用 grid-row 和 grid-column 放置 Grid 项
- 使用 grid-row-start、grid-row-end、grid-column-start 和 grid-column-end 跨越行和列
- 使用 grid-area 进行复杂的放置

## V. 调整 Grid 项大小

使用 grid-template-rows 和 grid-template-columns 指定固定尺寸

## VI. 对齐 Grid 项

- 使用 justify-items 沿着行轴对齐 Grid 项
- 使用 align-items 沿着列轴对齐 Grid 项
- 使用 justify-self 和 align-self 对单个 Grid 项对齐

## VII. 嵌套的网格

- 使用 grid 创建嵌套的网格
- 如何在 Grid 项内创建新的 Grid 容器
- 如何为嵌套的 Grid 容器定义行和列
- 如何在嵌套的 Grid 中放置 Grid 项
- 如何调整嵌套的 Grid 项的大小和对齐方式

## VIII. 实战案例

- 使用 CSS Grid 布局创建复杂的页面布局
- 常见的 CSS Grid 布局技巧和模式

## IX. 总结

- CSS Grid 布局的优点和应用场景
- CSS Grid 布局与其他布局技术的比较
- CSS Grid 布局的未来展望
