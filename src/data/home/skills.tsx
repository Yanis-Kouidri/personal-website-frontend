import atm from '../../assets/skills/networking/atm.webp'
import bgp from '../../assets/skills/networking/bgp.webp'
import frameRelay from '../../assets/skills/networking/framerelay.webp'
import fibreOptic from '../../assets/skills/networking/optical_fiber.webp'
import ospf from '../../assets/skills/networking/ospf.webp'
import router from '../../assets/skills/networking/router.webp'
import switching from '../../assets/skills/networking/switch.webp'
import tcp from '../../assets/skills/networking/tcp.webp'
import wireguard from '../../assets/skills/networking/wireguard.webp'
import wireshark from '../../assets/skills/networking/wireshark.webp'
import x25 from '../../assets/skills/networking/x25.webp'
import ada from '../../assets/skills/programming/ada.svg'
import c from '../../assets/skills/programming/C.webp'
import css from '../../assets/skills/programming/css.webp'
import git from '../../assets/skills/programming/git.webp'
import html from '../../assets/skills/programming/html.webp'
import java from '../../assets/skills/programming/java.webp'
import javascript from '../../assets/skills/programming/javascript.webp'
import ocaml from '../../assets/skills/programming/ocaml.webp'
import php from '../../assets/skills/programming/php.webp'
import python from '../../assets/skills/programming/python.webp'
import react from '../../assets/skills/programming/react.webp'
import ansible from '../../assets/skills/system/ansible.webp'
import antora from '../../assets/skills/system/antora.webp'
import argoWorkflow from '../../assets/skills/system/argo_workflow.webp'
import docker from '../../assets/skills/system/docker.webp'
import jenkins from '../../assets/skills/system/jenkins.webp'
import kubernetes from '../../assets/skills/system/kubernetes.webp'
import linux from '../../assets/skills/system/linux.webp'
import luigi from '../../assets/skills/system/luigi.webp'
import terraform from '../../assets/skills/system/terraform.webp'

interface Skill {
  name: string
  logo: string
  link: string
}

const skills: Record<string, Array<Skill>> = {
  programmation: [
    {
      link: 'https://en.wikipedia.org/wiki/C_(programming_language)',
      logo: c,
      name: 'C',
    },
    {
      link: 'https://fr.wikipedia.org/wiki/Java_(langage)',
      logo: java,
      name: 'Java',
    },
    {
      link: 'https://www.python.org/',
      logo: python,
      name: 'Python',
    },
    {
      link: 'https://www.php.net/',
      logo: php,
      name: 'PHP',
    },
    {
      link: 'https://ocaml.org/',
      logo: ocaml,
      name: 'OCaml',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Ada_(programming_language)',
      logo: ada,
      name: 'Ada',
    },
    {
      link: 'https://www.javascript.com/',
      logo: javascript,
      name: 'JavaScript',
    },
    {
      link: 'https://react.dev/',
      logo: react,
      name: 'React',
    },
    {
      link: 'https://wikipedia.org/wiki/Hypertext_Markup_Language',
      logo: html,
      name: 'HTML',
    },
    {
      link: 'https://wikipedia.org/wiki/CSS',
      logo: css,
      name: 'CSS',
    },
    {
      link: 'https://git-scm.com/',
      logo: git,
      name: 'Git',
    },
  ],
  systeme: [
    {
      link: 'https://www.docker.com/',
      logo: docker,
      name: 'Docker',
    },
    {
      link: 'https://kubernetes.io',
      logo: kubernetes,
      name: 'Kubernetes',
    },
    {
      link: 'https://www.ansible.com/',
      logo: ansible,
      name: 'Ansible',
    },
    {
      link: 'https://www.terraform.io/',
      logo: terraform,
      name: 'Terraform',
    },
    {
      link: 'https://antora.org/',
      logo: antora,
      name: 'Antora',
    },
    {
      link: 'https://www.jenkins.io/',
      logo: jenkins,
      name: 'Jenkins',
    },
    {
      link: 'https://argoproj.github.io/workflows/',
      logo: argoWorkflow,
      name: 'Argo Workflow',
    },
    {
      link: 'https://github.com/spotify/luigi',
      logo: luigi,
      name: 'Luigi',
    },
    {
      link: 'https://www.linux.org',
      logo: linux,
      name: 'Linux',
    },
  ],
  reseau: [
    {
      link: 'https://en.wikipedia.org/wiki/Network_switch',
      logo: switching,
      name: 'Switch',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Router_(computing)',
      logo: router,
      name: 'Router',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Border_Gateway_Protocol',
      logo: bgp,
      name: 'BGP',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Open_Shortest_Path_First',
      logo: ospf,
      name: 'OSPF',
    },
    {
      link: 'https://www.wireshark.org/',
      logo: wireshark,
      name: 'Wireshark',
    },
    {
      link: 'https://www.wireguard.com/',
      logo: wireguard,
      name: 'WireGuard',
    },
    {
      link: 'https://en.wikipedia.org/wiki/X.25',
      logo: x25,
      name: 'X.25',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Asynchronous_Transfer_Mode',
      logo: atm,
      name: 'ATM',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Frame_Relay',
      logo: frameRelay,
      name: 'Frame Relay',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Optical_fiber',
      logo: fibreOptic,
      name: 'Fibre optique',
    },
    {
      link: 'https://en.wikipedia.org/wiki/Transmission_Control_Protocol',
      logo: tcp,
      name: 'TCP',
    },
  ],
}

export default skills
