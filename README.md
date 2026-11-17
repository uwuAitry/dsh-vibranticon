# dsh-vibranticon

DSH 灵动图标：给 Web UI 的产品与导航图标加上贴合语义的悬停动效，并在设置页提供两个开关。静止时零动画，几乎零开销。

## 安装

```bash
dsh plugin --profile web add "github:uwuAitry/dsh-vibranticon#main"
```

## 设置

设置 → 灵动图标：

- **界面图标动效**：鼠标悬停产品或导航图标时播放一次短动效，移开即回到静止。
- **思考图标持续旋转**：模型推理时「思考」图标缓慢自转，推理结束即停。

偏好保存在浏览器 `localStorage('vibranticon/prefs')`，纯本地视觉偏好，不读取或发送任何会话数据；开启 `prefers-reduced-motion` 时不动。

## 说明

- 覆盖 32 枚 DSH 官方 16px 图标，纯前端、无外部依赖。
- `client.js` 由 `gen-icons.mjs` 从 `iconpack/data.js` 生成；重新生成：`node gen-icons.mjs`。
- 自检：`node _selftest.mjs`。

## License

MIT
