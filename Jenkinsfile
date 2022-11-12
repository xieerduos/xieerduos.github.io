def aly_workspace = "/home" // 阿里云服务器工作目录
def aly_project_name = "gitee.io" // 阿里云服务器部署项目名称

stage("部署项目")

node {
    sshagent(credentials: ['ssh-aly-deployment']) {
        sh "ssh -o StrictHostKeyChecking=yes ${aly_username}@${aly_server_ip} \" \
            cd ${aly_workspace}/${aly_project_name} \
            && git pull \
            \""
        sh "ssh -o StrictHostKeyChecking=yes ${aly_username}@${aly_server_ip} \" \
            cd ${aly_workspace}/${aly_project_name} \
            && npm run deploy \
            \""
    }
}
