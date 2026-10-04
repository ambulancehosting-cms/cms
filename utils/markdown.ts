// Renderer markdown minimal dan aman: HTML di-escape lebih dulu.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function inline(s: string): string {
  let t = esc(s)
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  t = t.replace(/(^|[^*])\*(?!\s)([^*]+?)\*/g, '$1<em>$2</em>')
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*|tel:[^\s)]+|mailto:[^\s)]+)\)/g,
    (_m, text, url) => `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`)
  return t
}

export function renderMarkdown(src: string | null | undefined): string {
  if (!src) return ''
  const lines = String(src).replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let list: 'ul' | 'ol' | null = null
  let para: string[] = []
  const flushPara = () => { if (para.length) { out.push(`<p>${para.map(inline).join('<br>')}</p>`); para = [] } }
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null } }
  for (const raw of lines) {
    const line = raw.trimEnd()
    let m: RegExpMatchArray | null
    if (!line.trim()) { flushPara(); closeList(); continue }
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flushPara(); closeList()
      const lvl = Math.min(Math.max(m[1].length + 1, 2), 4)
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`)
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flushPara()
      if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul' }
      out.push(`<li>${inline(m[1])}</li>`)
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      flushPara()
      if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol' }
      out.push(`<li>${inline(m[1])}</li>`)
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara(); closeList()
      out.push(`<blockquote>${inline(m[1])}</blockquote>`)
    } else {
      closeList()
      para.push(line)
    }
  }
  flushPara(); closeList()
  return out.join('\n')
}

export const formatRupiah = (n: number | null | undefined) =>
  n ? 'Rp ' + new Intl.NumberFormat('id-ID').format(n) : ''

export const formatDate = (d: string | null | undefined) => {
  if (!d) return ''
  const dt = new Date(d.length <= 10 ? d + 'T00:00:00' : d.replace(' ', 'T') + 'Z')
  return isNaN(+dt) ? d : new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(dt)
}
